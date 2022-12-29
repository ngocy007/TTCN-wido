import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/multi_images_utils.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/presentation/pages/post/create_post_page.dart';

class UpLoadPage extends StatefulWidget {
  const UpLoadPage({Key? key}) : super(key: key);

  @override
  State<UpLoadPage> createState() => _UpLoadPageState();
}

class _UpLoadPageState extends State<UpLoadPage> {
  bool _loading = false;
  List<String> multiple = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Chọn ảnh"),
        backgroundColor: backGroundColor,
      ),
      backgroundColor: backGroundColor,
      body: ProgressHUD(
        child: upLoadUI(),
        opacity: .3,
        inAsyncCall: _loading,
        key: UniqueKey(),
      ),
    );
  }

  upLoadUI() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          child: MultiImagePicker(
            totalImages: 12,
            imageSource: ImagePickSource.gallery,
            initialValue: const [],
            onImageChanged: (images) => {
              multiple = [],
              images.forEach((image) {
                if (image is ImageUploadModel) {
                  multiple.add(image.imageFile);
                }
              }),
            },
          ),
        ),
        Center(
          child: ElevatedButton(
            child: Text("Tạo bài"),
            onPressed: ()  {
             Navigator.of(context).push(MaterialPageRoute(builder: (context) => CreatePostPage(files: multiple,),));
            },
          ),
        )
      ],
    );
  }
}
