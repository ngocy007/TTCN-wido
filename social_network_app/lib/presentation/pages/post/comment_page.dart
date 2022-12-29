import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

class CommentPage extends StatefulWidget {
  final Post post;

  const CommentPage({Key? key, required this.post}) : super(key: key);

  @override
  State<CommentPage> createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  bool _isUserReplaying = false;
  bool _btnEnabled = false;
  bool _loading = true;
  bool _isCreate = false;
  String? imageUser;
  List<Comment> comments = [];
  final TextEditingController cmtTXT = TextEditingController();
  int? uid;

  Future<dynamic> _comment() async {
    ApiResponse response =
    await createCMT(cmtTXT.text.trim(), widget.post.id_post!);
    if (response.error == null) {
      setState(() {
        comments.insert(0, response.data as Comment);
        cmtTXT.text = "";
        _isCreate = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) =>
      {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
              builder: (context) => SignInPage(),
            ),
                (route) => false)
      });
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  Future<dynamic> _loadCmt() async {
    uid = await getUserId();
    ApiResponse response = await getComments(widget.post.id_post!);
    if (response.error == "") {
      setState(() {
        comments = response.data as List<Comment>;
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) =>
      {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
              builder: (context) => SignInPage(),
            ),
                (route) => false)
      });
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  Future<dynamic> _deleteCmt(int id) async {
    ApiResponse response = await deleteComment(id);
    if (response.error == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Đã xóa bình luận')));
    } else if (response.error == unauthorized) {
      logout().then((value) =>
          Navigator.of(context).pushAndRemoveUntil(
              MaterialPageRoute(
                builder: (context) => SignInPage(),
              ),
                  (route) => false));
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  @override
  void didChangeDependencies() async {
    super.didChangeDependencies();
    imageUser = await getImage();
    super.setState(() {}); // to update widget data
  }

  @override
  void initState() {
    _loadCmt();
    cmtTXT.addListener(() {
      setState(() {
        _btnEnabled = cmtTXT.text.isNotEmpty;
      });
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundColor,
      appBar: AppBar(
        backgroundColor: backGroundColor,
        title: Text("Bình luận"),
      ),
      body: _loading == true
          ? Center(
        child: CircularProgressIndicator(),
      )
          : SingleChildScrollView(
        child: Column(
          children: [
            Column(
              children: [
                ListView(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  children: [
                    ListTile(
                      leading: Container(
                        width: 40,
                        height: 40,
                        child: CircleAvatar(
                          backgroundColor: secondaryColor,
                          backgroundImage:
                          NetworkImage(widget.post.user!.image!),
                        ),
                      ),
                      title: RichText(
                        text: TextSpan(children: [
                          TextSpan(
                            text: widget.post.user!.name! + " ",
                            style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                                color: primaryColor),
                          ),
                          TextSpan(
                              text: widget.post.content,
                              style: TextStyle(
                                  fontSize: 18, color: primaryColor))
                        ]),
                      ),
                      subtitle: Text(cvDate(widget.post.createdAt)),
                    ),
                  ],
                ),
                Divider(
                  color: darkGreyColor,
                )
              ],
            ),
            comments.isEmpty
                ? Center(
              child: Text(
                "Hãy là người bình luận đầu tiên",
                style: TextStyle(fontSize: 16),
              ),
            )
                : ListView.builder(
                physics: const NeverScrollableScrollPhysics(),
                itemCount: comments.length,
                shrinkWrap: true,
                itemBuilder: (context, index) {
                  return ListTile(
                    onLongPress: comments[index].user!.id_user == uid || widget.post.id_user == uid
                        ? () => _openBottomModalSheet(context, comments[index].id_com!, index) : null,
                    onTap: () =>
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) =>
                              ProfilePage(
                                  name: comments[index].user!.name,
                                  user_id: comments[index].user!.id_user),
                        )),
                    leading: Container(
                      width: 40,
                      height: 40,
                      child: CircleAvatar(
                        backgroundColor: secondaryColor,
                        backgroundImage: NetworkImage(
                            comments[index].user!.image!),
                      ),
                    ),
                    title: RichText(
                      text: TextSpan(children: [
                        TextSpan(
                          text: "${comments[index].user!.name} ",
                          style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w500,
                              color: primaryColor),
                        ),
                        TextSpan(
                            text: comments[index].content,
                            style: TextStyle(
                                fontSize: 18, color: primaryColor))
                      ]),
                    ),
                    subtitle: Row(
                      children: [
                        Text(cvDate(comments[index].createdAt)),
                        sizeHor(10),
                        Text("Trả lời")
                      ],
                    ),
                  );
                }),
          ],
        ),
      ),
      bottomSheet: _commentSection(),
    );
  }

  _commentSection() {
    return Container(
      width: double.infinity,
      height: 55,
      color: Colors.grey[800],
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10.0),
        child: Row(
          children: [
            Container(
              width: 40,
              height: 40,
              child: CircleAvatar(
                backgroundColor: secondaryColor,
                backgroundImage: NetworkImage(imageUser!),
              ),
            ),
            sizeHor(10),
            Expanded(
                child: _isCreate == true
                    ? Center(
                  child: CircularProgressIndicator(
                    color: Colors.grey,
                  ),
                )
                    : TextFormField(
                  controller: cmtTXT,
                  style: TextStyle(color: primaryColor),
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Viết bình luận...",
                      hintStyle: TextStyle(color: secondaryColor)),
                )),
            TextButton(
                onPressed: _btnEnabled
                    ? () {
                  setState(() {
                    _isCreate = true;
                  });
                  _comment();
                }
                    : null,
                child: Text(
                  "Đăng",
                  style: TextStyle(fontSize: 15, color: blueColor),
                ))
          ],
        ),
      ),
    );
  }

  _openBottomModalSheet(BuildContext context, int id, int index) {
    return showModalBottomSheet(
        barrierColor: Colors.transparent,
        backgroundColor: Colors.blue,
        context: context,
        builder: (context) {
          return ListTile(
            leading: IconButton(
              onPressed: () => Navigator.of(context).pop(),
              icon: Icon(Icons.clear),
            ),
            trailing: IconButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    title: Text("Thông báo?"),
                    content: Text("Bạn muốn xóa bình luận"),
                    actions: [
                      TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: Text("Hủy",
                              style: TextStyle(color: Colors.white))),
                      TextButton(
                          onPressed: () async {
                            await _deleteCmt(id).then((value) {
                              setState(() {
                                comments.removeAt(index);
                              });
                              Navigator.of(context).pop();
                            });
                          },
                          child: Text(
                            "OK",
                            style: TextStyle(color: Colors.white),
                          )),
                    ],
                  ),
                );
              },
              icon: Icon(Icons.delete_forever),
            ),
          );
        });
  }
}
