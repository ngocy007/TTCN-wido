import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
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


  Future<dynamic> _comment() async {
    ApiResponse response = await createCMT(cmtTXT.text,widget.post.id_post!);
    if (response.error == null) {
      setState((){
        comments.add(response.data as Comment);
        cmtTXT.text = "";
        _isCreate = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => {
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
    ApiResponse response = await getComments(widget.post.id_post!);
    if (response.error == "") {
      setState(() {
        comments = response.data as List<Comment>;
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => {
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

  @override
  void didChangeDependencies() async {
    super.didChangeDependencies();
    imageUser = await getImage();
    super.setState(() {}); // to update widget data
    /// new
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
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      width: 40,
                      height: 40,
                      child: CircleAvatar(
                        backgroundColor: secondaryColor,
                        backgroundImage: NetworkImage(widget.post.user!.image!),
                      ),
                    ),
                    sizeHor(10),
                    Text(
                      widget.post.user!.name!,
                      style: TextStyle(
                          fontSize: 15,
                          fontWeight: FontWeight.bold,
                          color: primaryColor),
                    ),
                  ],
                ),

                widget.post.content!.isNotEmpty ? Column(
                  children: [
                    sizeVer(10),
                    Text(
                      widget.post.content!,
                      style: TextStyle(color: primaryColor),
                    ),
                  ],
                ) : SizedBox(),
              ],
            ),
          ),
          Divider(
            color: secondaryColor,
          ),
          sizeVer(10),
          Expanded(
            child: _loading == true ? Center(child: CircularProgressIndicator()) : CustomScrollView(slivers: [
              SliverList(delegate: SliverChildBuilderDelegate((context, index) {
                return Container(
                  margin: EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        child: CircleAvatar(
                          backgroundColor: secondaryColor,
                          backgroundImage: NetworkImage(comments[index].user!.image!),
                        ),
                      ),
                      sizeHor(10),
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    comments[index].user!.name!,
                                    style: TextStyle(
                                        fontSize: 15,
                                        fontWeight: FontWeight.bold,
                                        color: primaryColor),
                                  ),
                                  Icon(
                                    Icons.favorite_outline,
                                    size: 20,
                                    color: darkGreyColor,
                                  )
                                ],
                              ),
                              sizeVer(4),
                              Text(
                                comments[index].content!,
                                style: TextStyle(color: primaryColor),
                              ),
                              sizeVer(4),
                              Row(
                                children: [
                                  Text(
                                    cvDate(comments[index].createdAt!),
                                    style: TextStyle(
                                        color: darkGreyColor, fontSize: 12),
                                  ),
                                  sizeHor(15),
                                  GestureDetector(
                                      onTap: () {
                                        setState(() {
                                          _isUserReplaying = !_isUserReplaying;
                                        });
                                      },
                                      child: Text(
                                        "Trả lời",
                                        style: TextStyle(
                                            color: darkGreyColor, fontSize: 12),
                                      )),
                                  sizeHor(15),
                                  Text(
                                    "View Replays",
                                    style: TextStyle(
                                        color: darkGreyColor, fontSize: 12),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },childCount: comments.length
              ))
            ],)
          ),
          _commentSection()
        ],
      ),
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
                child: _isCreate == true ? Center(child: CircularProgressIndicator(color: Colors.grey,),):TextFormField(
                  controller: cmtTXT,
                  style: TextStyle(color: primaryColor),
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      hintText: "Viết bình luận...",
                      hintStyle: TextStyle(color: secondaryColor)),
                )),
            TextButton(onPressed: _btnEnabled ? () {
              setState(() {
                _isCreate = true;
              });
              _comment();
            } : null, child: Text(
              "Đăng",
              style: TextStyle(fontSize: 15, color: blueColor),
            )
            )
          ],
        ),
      ),
    );
  }
}
