import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/Message/list_message_page.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/home/widgets/display_files.dart';
import 'package:social_network_app/presentation/pages/post/post_card.dart';
import 'package:social_network_app/presentation/pages/post/upload_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _controller = ScrollController();
  final List<dynamic> _postlist = [];
  int uid = 0;
  bool _loading = true;
  int page = 0;
  bool _more = true;
  String _fileText = "";

  Future<dynamic> _loadPosts() async {
    uid = await getUserId();
    int limit = 5;
    ApiResponse response = await getPosts(limit, page);
    if (response.error == null) {
      final List newItems = response.data as List;
      setState(() {
        page++;
        if (newItems.length < limit) {
          _more = false;
        }
        _postlist.addAll(newItems);
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

  Future refresh() async {
    setState(() {
      _loading = true;
      _more = true;
      page = 0;
      _postlist.clear();
    });
    _loadPosts();
  }

  @override
  void initState() {
    super.initState();
    _loadPosts();
    _controller.addListener(() {
      if (_controller.position.maxScrollExtent == _controller.offset) {
        _loadPosts();
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: backGroundColor,
        appBar: AppBar(
          backgroundColor: backGroundColor,
          title: SvgPicture.asset(
            "assets/ic_instagram.svg",
            color: primaryColor,
            height: 32,
          ),
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 10.0),
              child: Row(
                children: [
                  IconButton(
                      onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => UpLoadPage(),)),
                      icon: Icon(Icons.add_box_outlined)),
                  SizedBox(
                    width: 20,
                  ),
                  IconButton(
                    onPressed: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => ListMessagePage(),)),
                    icon: Icon(MaterialCommunityIcons.facebook_messenger,
                        color: primaryColor, size: 28),
                  ),
                ],
              ),
            )
          ],
        ),
        body: _loading
            ? Center(
                child: CircularProgressIndicator(
                  color: Colors.grey,
                ),
              )
            : RefreshIndicator(
                onRefresh: refresh,
                child: ListView.builder(
                  controller: _controller,
                  itemCount: _postlist.length + 1,
                  itemBuilder: (context, index) {
                    if (index < _postlist.length) {
                      return PostCard(
                        post: _postlist[index],
                      );
                    } else {
                      return Padding(
                        padding: EdgeInsets.symmetric(vertical: 30),
                        child: Center(
                          child: _more
                              ? CircularProgressIndicator(
                                  color: Colors.white,
                                )
                              : Text("Bài viết đã hết :))"),
                        ),
                      );
                    }
                  },
                ),
              ));
  }

  void _pickFiles() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
        allowMultiple: true);
    if (result != null && result.files.single.path != null) {
      PlatformFile file = result.files.first;
      print(file.name);
      print(file.bytes);
      print(file.size);
      print(file.extension);
      print(file.path);

      File _file = File(result.files.single.path!);
      setState(() {
        _fileText = _file.path;
      });
    } else {
      /// User canceled the picker
    }
  }

// void loadSelectedFile(List<PlatformFile> files) {
//   Navigator.of(context).push(MaterialPageRoute(
//     builder: (context) => DisplayFiles(files: files, openedFile: viewFile),
//   ));
// }
//
// void viewFile(PlatformFile file) {
//   OpenFile.open(file.path);
// }
}
