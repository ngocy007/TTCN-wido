import 'package:flutter/material.dart';
import '../../../../consts.dart';
class ProfileFormWidget extends StatelessWidget {
  final TextEditingController? controller;
  final String? title;
  final bool? readonly;
  final VoidCallback? onTap;
  const ProfileFormWidget({Key? key, this.title, this.controller, this.readonly, this.onTap}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text("$title", style: TextStyle(color: primaryColor, fontSize: 16),),
        sizeVer(10),
        TextFormField(
          readOnly: readonly!,
          onTap: onTap,
          controller: controller,
          style: TextStyle(color: primaryColor),
          decoration: InputDecoration(
              border: InputBorder.none,
              labelStyle: TextStyle(color: primaryColor)
          ),
        ),
        Container(
          width: double.infinity,
          height: 1,
          color: secondaryColor,
        )
      ],
    );
  }
}