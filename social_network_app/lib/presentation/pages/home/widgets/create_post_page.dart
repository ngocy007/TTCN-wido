import 'package:flutter/material.dart';
import 'package:image_picker_plus/image_picker_plus.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';

class CreatePostPage extends StatefulWidget {
  final List<SelectedByte> selectedBytes;

  const CreatePostPage({Key? key, required this.selectedBytes})
      : super(key: key);

  @override
  State<CreatePostPage> createState() => _CreatePostPageState();
}

class _CreatePostPageState extends State<CreatePostPage> {
  bool _loading = false;
  late SelectedByte selectedByte;
  TextEditingController content = TextEditingController();

  @override
  void initState() {
    selectedByte = widget.selectedBytes.first;
    super.initState();
  }

  void _createPost() async {
    List urls = [];
    widget.selectedBytes.forEach((element) {
      urls.add(element.selectedFile);

    });
    ApiResponse response = await createPost(content.text, urls);
    if (response.error == null) {
      setState(() {
        print("Thành công");
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
                onPressed: () {
                  _createPost();
                },
                icon: Icon(Icons.add))
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
                      child: widget.selectedBytes.length > 1
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
                          image: FileImage(selectedByte.selectedFile),
                          fit: BoxFit.contain,
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
