import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';

class DisplayFiles extends StatefulWidget {
  const DisplayFiles({Key? key, required this.files, required this.openedFile}) : super(key: key);
  final List<PlatformFile> files;
  final ValueChanged<PlatformFile> openedFile;
  @override
  State<DisplayFiles> createState() => _DisplayFilesState();
}

class _DisplayFilesState extends State<DisplayFiles> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Chọn ảnh")),
      body: ListView.builder(itemCount: widget.files.length,itemBuilder:(context, index) {
        return buildListFile(widget.files[index]);
      },),
    );
  }
  Widget buildListFile(PlatformFile file){
    return ListTile(
      title: Text(file.name),
    );
  }
}
