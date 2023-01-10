import 'dart:io';
import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/Loading.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/main_screen/main_screen.dart';

class CreatePostPage extends StatefulWidget {
  final List<String> files;

  const CreatePostPage({Key? key, required this.files}) : super(key: key);

  @override
  State<CreatePostPage> createState() => _CreatePostPageState();
}

class _CreatePostPageState extends State<CreatePostPage> {
  bool _loading = false;
  String selectedFile = "";
  TextEditingController content = TextEditingController();

  @override
  void initState() {
    selectedFile = widget.files.first;
    super.initState();
  }

  Future<dynamic> _createPost() async {
    setState(() {
      _loading = true;
    });
    ApiResponse response = await createPost(content.text, widget.files);
    if (response.error == null) {
      setState(() {
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
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
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          title: Text("Bài viết mới"),
          actions: [
            IconButton(
                onPressed: () async {
                 if(content.text.trim().length > 250){
                   ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Chiều dài nội dung không quá 250 ký tự"),duration: Duration(seconds: 1),));
                 }else{
                   await _createPost().then((value) {
                     Navigator.of(context).pushAndRemoveUntil(
                         MaterialPageRoute(
                           builder: (context) =>
                               Loading(),
                         ),
                             (route) => false);
                   });
                 }
                },
                icon: _loading == true
                    ? Center(
                        child: CircularProgressIndicator(),
                      )
                    : Icon(Icons.add))
          ],
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
              child: TextField(
                textAlignVertical: TextAlignVertical.center,
                keyboardType: TextInputType.multiline,
                maxLines: null,
                controller: content,
                decoration: InputDecoration(
                    prefixIcon: Container(
                      padding: EdgeInsets.fromLTRB(0, 5, 5, 0),
                      child: widget.files.length > 1
                          ? Stack(
                              alignment: Alignment.topRight,
                              children: [
                                Icon(
                                  Icons.collections,
                                  color: Colors.white,
                                  size: 25,
                                )
                              ],
                            )
                          : null,
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: FileImage(File(selectedFile)),
                          fit: BoxFit.cover,
                        ),
                      ),
                      margin: EdgeInsets.only(right: 10),
                      width: MediaQuery.of(context).size.width * 1 / 4,
                      height: MediaQuery.of(context).size.width * 1 / 4,
                    ),
                    border: InputBorder.none,
                    hintText: 'Viết nội dung...'),
              ),
            ),
            Divider(
              color: secondaryColor,
            ),
          ],
        ),
      ),
    );
  }

}
