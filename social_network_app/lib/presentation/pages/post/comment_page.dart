import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/comment/comment.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

class CommentPage extends StatefulWidget {
  final Post post;
  final String avatar;

  const CommentPage({Key? key, required this.post, required this.avatar})
      : super(key: key);

  @override
  State<CommentPage> createState() => _CommentPageState();
}

class _CommentPageState extends State<CommentPage> {
  bool _isReply = false;
  bool _btnEnabled = false;
  bool _loading = true;
  bool _isCreate = false;
  List<Comment> comments = [];
  List<Comment> replies = [];
  int? _selectedItem;
  final TextEditingController cmtTXT = TextEditingController();
  int? uid;
  late FocusNode myFocusNode;
  String hintText = "Viết bình luận ...";
  int? idReply;
  int? countRep;
  int? indexRep;
  bool _more = true;

  Future<dynamic> _comment(int? reply) async {
    ApiResponse response =
    await createCMT(cmtTXT.text.trim(), widget.post.id_post!, reply);
    if (response.error == null) {
      setState(() {
        if (_isReply != true) {
          comments.insert(0, response.data as Comment);
        }
        else {
          replies.insert(0, response.data as Comment);
        }
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

  Future<dynamic> _getReply(int id) async {
    ApiResponse response = await getReplies(id);
    if (response.error == null) {
      setState(() {
        replies = (response.data as List<Comment>).isEmpty
            ? []
            : response.data as List<Comment>;
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
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Đã xóa bình luận'),
        duration: Duration(seconds: 1),
      ));
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
  void initState() {
    _loadCmt();
    cmtTXT.addListener(() {
      setState(() {
        _btnEnabled = cmtTXT.text.isNotEmpty;
      });
    });
    super.initState();
    myFocusNode = FocusNode();
  }

  @override
  void dispose() {
    myFocusNode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) =>
      WillPopScope(
        onWillPop: () async {
          Navigator.pop(context, comments.length + replies.length);
          return true;
        },
        child: Scaffold(
          backgroundColor: backGroundColor,
          appBar: AppBar(
              backgroundColor: backGroundColor, title: Text("Bình luận")),
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
                          leading: CircleAvatar(
                            backgroundColor: secondaryColor,
                            backgroundImage:
                            NetworkImage(widget.post.user!.image!),
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
                    key: Key('selected $_selectedItem'),
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: comments.length +1,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                     if(index < comments.length){
                       return GestureDetector(
                         onLongPress:
                         comments[index].user!.id_user == uid ||
                             widget.post.id_user == uid
                             ? () {
                           _isReply = false;
                           _openBottomModalSheet(context,
                               comments[index].id_com!, index);
                         }
                             : null,
                         child: ExpansionTile(
                             initiallyExpanded: index == _selectedItem,
                             key: Key(index.toString()),
                             onExpansionChanged: (isOpen) {
                               if (isOpen) {
                                 setState(() {
                                   _selectedItem = index;
                                   replies.clear();
                                 });
                                 comments[index].countRep! > 0
                                     ? _getReply(
                                     comments[index].id_com!)
                                     : print("a");
                               }
                             },
                             trailing: const SizedBox.shrink(),
                             leading: GestureDetector(
                               onTap: () {
                                 Navigator.of(context).push(MaterialPageRoute(
                                     builder: (context)
                                     =>
                                         ProfilePage(
                                             name: comments[index].user!.name,
                                             user_id: comments[index].user!.id_user)));
                               },
                               child: CircleAvatar(
                                 backgroundColor: secondaryColor,
                                 backgroundImage: NetworkImage(
                                     comments[index].user!.image!),
                               ),
                             ),
                             title: RichText(
                               text: TextSpan(children: [
                                 TextSpan(
                                   text:
                                   "${comments[index].user!.name} ",
                                   style: TextStyle(
                                       fontSize: 18,
                                       fontWeight: FontWeight.w600,
                                       color: primaryColor),
                                 ),
                                 TextSpan(
                                   // text: comments[index].content ,
                                     text: "${comments[index].id_com}",
                                     style: TextStyle(
                                         fontSize: 18,
                                         color: primaryColor))
                               ]),
                             ),
                             subtitle: Column(
                               children: [
                                 Row(
                                   children: [
                                     Text(
                                       cvDate(
                                           comments[index].createdAt),
                                       style: TextStyle(
                                           color: Colors.grey),
                                     ),
                                     sizeHor(10),
                                     GestureDetector(
                                         onTap: () {
                                           setState(() {
                                             hintText =
                                             "@${comments[index].user!.name}";
                                             _isReply = true;
                                             idReply = comments[index].id_com;
                                             replies.clear();
                                             indexRep = index;
                                             if (comments[index].countRep! > 0) {
                                               _selectedItem = index;
                                             }
                                           });
                                           if (myFocusNode
                                               .hasPrimaryFocus) {
                                             FocusScope.of(context)
                                                 .unfocus();
                                           } else
                                             FocusScope.of(context)
                                                 .requestFocus(
                                                 myFocusNode);
                                         },
                                         child: Text(
                                           "Trả lời",
                                           style: TextStyle(
                                               color: Colors.grey),
                                         ))
                                   ],
                                 ),
                                 comments[index].countRep != 0
                                     ? Column(
                                   children: [
                                     sizeVer(10),
                                     GestureDetector(
                                         child: Text(
                                           "${comments[index]
                                               .countRep} trả lời bình luận",
                                           style: TextStyle(
                                               color:
                                               Colors.grey),
                                         )),
                                   ],
                                 )
                                     : SizedBox()
                               ],
                             ),
                             children: listReply()),
                       );
                     }
                     else if(comments.length < 9){
                       return SizedBox();
                     }
                     else{
                       return Padding(
                         padding: EdgeInsets.symmetric(vertical: 30),
                         child: Center(
                           child: _more
                               ? Icon(Icons.add_circle_outline, size: 50,)
                               : Text("Bài viết đã hết :))"),
                         ),
                       );
                     }
                    }
                ),
              ],
            ),
          ),
          bottomSheet: _commentSection(),
        ),
      );

  _commentSection() {
    return Container(
      width: double.infinity,
      height: _isReply == false ? 60 : 80,
      color: Colors.grey[800],
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 10.0),
        child: Column(
          children: [
            _isReply == false
                ? sizeVer(0)
                : Align(
                alignment: Alignment.centerLeft,
                child: Row(
                  children: [
                    Text(
                      "Đang trả lời ${hintText}",
                      style: TextStyle(fontSize: 15),
                    ),
                    sizeHor(10),
                    InkWell(
                      child: Text(
                          "Hủy", style: TextStyle(fontWeight: FontWeight.w600)),
                      onTap: () {
                        setState(() {
                          _isReply = false;
                          idReply = null;
                          hintText = "Viết bình luận ...";
                        });
                      },
                    )
                  ],
                )),
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: secondaryColor,
                  backgroundImage: NetworkImage(widget.avatar),
                ),
                sizeHor(10),
                Expanded(
                    child: _isCreate == true
                        ? Center(
                      child: CircularProgressIndicator(
                        color: Colors.grey,
                      ),
                    )
                        : TextField(
                      controller: cmtTXT,
                      focusNode: myFocusNode,
                      style: TextStyle(color: primaryColor),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: hintText,
                          hintStyle: TextStyle(color: secondaryColor)),
                    )),
                TextButton(
                    onPressed: _btnEnabled
                        ? () {
                      setState(() {
                        _isCreate = true;
                      });
                      if (_isReply == true) {
                        _comment(idReply!);
                        comments[indexRep!].countRep =
                            comments[indexRep!].countRep! + 1;
                      }
                      else {
                        _comment(-1);
                        comments[indexRep!].countRep =
                            comments[indexRep!].countRep! + 1;
                      }
                    }
                        : null,
                    child: Text(
                      "Đăng",
                      style: TextStyle(fontSize: 15, color: blueColor),
                    ))
              ],
            ),
          ],
        ),
      ),
    );
  }

  List<Widget> listReply() {
    List<Widget> childs = [];
    for (var i = 0; i < replies.length; i++) {
      childs.add(ListTile(
        contentPadding: EdgeInsets.only(left: 70),
        onLongPress: replies[i].user!.id_user == uid ||
            widget.post.id_user == uid ? () {
          _isReply = true;
          _openBottomModalSheet(context, replies[i].id_com!, i);
        } : null,
        trailing: const SizedBox.shrink(),
        leading: CircleAvatar(
          backgroundColor: secondaryColor,
          backgroundImage: NetworkImage(replies[i].user!.image!),
        ),
        title: RichText(
          text: TextSpan(children: [
            TextSpan(
              text: "${replies[i].user!.name} ",
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: primaryColor),
            ),
            TextSpan(
                text: replies[i].content,
                style: TextStyle(fontSize: 18, color: primaryColor))
          ]),
        ),
        subtitle: Column(
          children: [
            Row(
              children: [
                Text(
                  cvDate(replies[i].createdAt),
                  style: TextStyle(color: Colors.grey),
                ),
                sizeHor(10),
                GestureDetector(
                    onTap: () {
                      if (myFocusNode.hasPrimaryFocus) {
                        FocusScope.of(context).unfocus();
                      } else
                        FocusScope.of(context).requestFocus(myFocusNode);
                    },
                    child: Text(
                      "Trả lời",
                      style: TextStyle(color: Colors.grey),
                    ))
              ],
            ),
          ],
        ),
      ));
    }
    return childs;
  }

  _openBottomModalSheet(BuildContext context, int id, int index) {
    return showModalBottomSheet(
        barrierColor: Colors.transparent,
        backgroundColor: Colors.blue,
        context: context,
        builder: (context) {
          return ListTile(
            leading: IconButton(
              onPressed: () {
                FocusScope.of(context).unfocus();
                Navigator.pop(context);
              },
              icon: Icon(Icons.clear),
            ),
            trailing: IconButton(
              onPressed: () async {
                Navigator.of(context).pop();
                await _deleteCmt(id).then((value) {
                  setState(() {
                    if (_isReply == false) {
                      print(comments[index].reply);
                      comments.removeAt(index);
                    }
                    else {
                      replies.removeAt(index);
                      comments[indexRep!].countRep = comments[indexRep!]
                          .countRep! - 1;
                    }
                  });
                });
              },
              icon: Icon(Icons.delete_forever),
            ),
          );
        });
  }
}
