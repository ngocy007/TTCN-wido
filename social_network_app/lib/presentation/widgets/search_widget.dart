import 'package:flutter/material.dart';
import '../../../../consts.dart';
class SearchWidget extends StatelessWidget {
  final TextEditingController controller;
  final VoidCallback? onTap;
  final ValueChanged<String>? onChanged;
  final bool? readOnLy;
  final bool? autoFocus;
  const SearchWidget({Key? key, required this.controller, this.onTap, required this.readOnLy, this.onChanged, this.autoFocus}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 45,
      decoration: BoxDecoration(
        color: secondaryColor.withOpacity(.3),
        borderRadius: BorderRadius.circular(15),
      ),
      child: TextFormField(
        autofocus: autoFocus!,
        controller: controller,
        readOnly: readOnLy!,
        onTap: onTap,
        onChanged: onChanged,
        style: TextStyle(color: primaryColor),
        decoration: InputDecoration(
            border: InputBorder.none,
            prefixIcon: Icon(Icons.search, color: primaryColor,),
            hintText: "Tìm kiếm",
            hintStyle: TextStyle(color: secondaryColor, fontSize: 15)
        ),
      ),
    )
    ;
  }
}