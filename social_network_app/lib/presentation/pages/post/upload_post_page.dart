import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/presentation/pages/post/create_post_page.dart';
import 'package:open_file/open_file.dart';

class UploadPostPage extends StatefulWidget {
  const UploadPostPage({Key? key}) : super(key: key);

  @override
  State<UploadPostPage> createState() => _UploadPostPageState();
}

class _UploadPostPageState extends State<UploadPostPage> {
  String fileType = 'Image';
  var fileTypeList = [ 'Image', 'Video', 'MultipleFile'];
  FilePickerResult? result;
  PlatformFile? file;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundColor,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  'Chọn ảnh hoặc video: ',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                DropdownButton(
                  value: fileType,
                  items: fileTypeList.map((String type) {
                    return DropdownMenuItem(
                        value: type,
                        child: Text(
                          type,
                          style: TextStyle(fontSize: 20),
                        ));
                  }).toList(),
                  onChanged: (String? value) {
                    setState(() {
                      fileType = value!;
                      file = null;
                    });
                  },
                ),
              ],
            ),
            ElevatedButton(
              onPressed: () async {
              },
              child: Text('Bước tiếp'),
            ),
          ],
        ),
      ),
    );
  }

}
