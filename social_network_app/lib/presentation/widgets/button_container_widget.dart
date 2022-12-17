
import 'package:flutter/material.dart';
import '../../consts.dart';


class ButtonContainerWidget extends StatelessWidget {
  final Color? color;
  final String? text;
  final VoidCallback? onPress;
  const ButtonContainerWidget({Key? key, this.color, this.text, this.onPress}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 45,
      width: double.infinity,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
            backgroundColor: color),
        onPressed: onPress,
        child: Text(
          "$text",
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}