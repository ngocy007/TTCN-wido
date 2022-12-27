import 'package:flutter/material.dart';
import 'package:image_picker_plus/image_picker_plus.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/presentation/pages/home/widgets/create_post_page.dart';
import 'package:social_network_app/presentation/pages/home/widgets/display_video.dart';

class DisplayImages extends StatefulWidget {
  final List<SelectedByte> selectedBytes;
  final double aspectRatio;
  final SelectedImagesDetails details;

  const DisplayImages({
    Key? key,
    required this.details,
    required this.selectedBytes,
    required this.aspectRatio,
  }) : super(key: key);

  @override
  State<DisplayImages> createState() => _DisplayImagesState();
}

class _DisplayImagesState extends State<DisplayImages> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Chọn ảnh hoặc video'),
        actions: [
          IconButton(
            onPressed: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (context) =>
                  CreatePostPage(selectedBytes: widget.selectedBytes),
            )),
            icon: Icon(Icons.arrow_forward),
          )
        ],
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          SelectedByte selectedByte = widget.selectedBytes[index];
          if (!selectedByte.isThatImage) {
            return DisplayVideo(selectedByte: selectedByte);
          } else {
            // print(getStringImage(selectedByte.selectedFile));
            return SizedBox(
              width: double.infinity,
              child: Image.file(selectedByte.selectedFile),
            );
          }
        },
        itemCount: widget.selectedBytes.length,
      ),
    );
  }
}
