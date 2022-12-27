import 'package:flutter/material.dart';
const backGroundColor = Color.fromRGBO(0, 0, 0, 1.0);
const blueColor = Color.fromRGBO(0, 149, 246, 1);
const primaryColor = Colors.white;
const secondaryColor = Colors.grey;
const darkGreyColor =  Color.fromRGBO(194, 189, 189, 1.0);

Widget sizeVer(double height) {
  return SizedBox(height: height,);
}
Widget sizeHor(double width) {
  return SizedBox(width: width);
}

String cvDate(String? date){
  var string = date!.substring(0, 10).split('-');
  return string.reversed.join("-");
}