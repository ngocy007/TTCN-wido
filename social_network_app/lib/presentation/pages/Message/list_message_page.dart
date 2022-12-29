import 'package:flutter/material.dart';
import 'package:social_network_app/consts.dart';

class ListMessagePage extends StatefulWidget {
  const ListMessagePage({Key? key}) : super(key: key);

  @override
  State<ListMessagePage> createState() => _ListMessagePageState();
}

class _ListMessagePageState extends State<ListMessagePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundColor,
      appBar: AppBar(
        backgroundColor: backGroundColor,
        title: Text("Tin nhắn"),
      ),
      body: ListView.builder(itemBuilder: (context, index) {
        return ListTile(title: Text("Gà"),);
      },),
    );
  }
}
