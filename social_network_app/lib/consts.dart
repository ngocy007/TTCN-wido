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
  //Chuyển thành múi giờ địa phương
  // Chuyển thành Thời gian + ngày, Ex: 16:25:59 29-12-2022
  var parsedDate = DateTime.parse(date!).toLocal().toString();
  var day = parsedDate.substring(0, 10).split('-');
  return "${parsedDate.substring(11, 19)} ${day.reversed.join("-")}";
}
