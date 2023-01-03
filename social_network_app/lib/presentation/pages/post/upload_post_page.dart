import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/multi_images_utils.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/presentation/pages/post/create_post_page.dart';

class UpLoadPostPage extends StatefulWidget {
  const UpLoadPostPage({Key? key}) : super(key: key);

  @override
  State<UpLoadPostPage> createState() => _UpLoadPostPageState();
}

class _UpLoadPostPageState extends State<UpLoadPostPage> {
  bool _loading = false;
  List<String> multiple = [];

  @override
  void initState() {
    super.initState();
  }
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
              if(multiple.length == 0){
                ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Vui lòng chọn ảnh"),duration: Duration(seconds: 1),));
              }
              else{
                Navigator.of(context).push(MaterialPageRoute(builder: (context) => CreatePostPage(files: multiple!,),));
              }
            },
          ),
        )
      ],
    );
  }
}
