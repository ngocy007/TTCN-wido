import 'dart:io';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/api/socket.dart';
import 'package:social_network_app/data/models/message/message.dart';
import 'package:social_network_app/data/service/message_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:grouped_list/grouped_list.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;


class RoomChatPage extends StatefulWidget {
  final String? name;
  final String? id;
  const RoomChatPage({Key? key, required this.name, required this.id})
      : super(key: key);

  @override
  State<RoomChatPage> createState() => _RoomChatPageState();
}

class _RoomChatPageState extends State<RoomChatPage> {
  ApiSocket socket = ApiSocket();
  bool check = true;
  bool _loading = true;
  List<Message> messages = [];
  String? myEmail;
  TextEditingController content = TextEditingController();
  bool checkTyping = false;

  Future<dynamic> _getMess() async {
    ApiResponse response = await getMessage(widget.id!);
    myEmail = await getEmail();
    if (response.error == null) {
      setState(() {
        messages = response.data as List<Message>;
        _loading = false;
        print(messages.length);
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => {
            Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                  builder: (context) => SignInPage(),
                ),
                (route) => false)
          });
    } else {
      setState(() {
        _loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  Future<dynamic> _sendMess(String chatId, String content) async {
    ApiResponse response = await sendMessage(chatId,content);
    if (response.error == null) {

    } else if (response.error == unauthorized) {
      logout().then((value) => {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
              builder: (context) => SignInPage(),
            ),
                (route) => false)
      });
    } else {
      setState(() {
        _loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  @override
  void initState() {
    socket.socket.on("new message", (data) {
      print("đã");
      print(data);
      Message newmess = Message.fromJson(data);
      setState(() {
        messages.add(newmess);
      });
    });
    socket.socket.on("typing", (data) {
      print(data);
    });
    socket.socket.on("stop typing", (data) {
      print(data);
    });
    _getMess();

    super.initState();
  }

  @override
  void dispose() {
    socket.socket.disconnect();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {

    return GestureDetector(
      onTap: ()=>FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        backgroundColor: backGroundColor,
        appBar: AppBar(
          backgroundColor: backGroundColor,
          title: Text(widget.name!),
        ),
        body: _loading == true ? Center(child: CircularProgressIndicator(),): Column(
          children: [
            Expanded(
              child: GroupedListView<Message, DateTime>(
                  padding: EdgeInsets.all(8),
                  reverse: true,
                  order: GroupedListOrder.DESC,
                  elements: messages,
                  groupBy: (message) => DateTime(
                      DateTime.parse(message.createdAt!).toLocal().year,
                      DateTime.parse(message.createdAt!).toLocal().month,
                      DateTime.parse(message.createdAt!).toLocal().day),
                  groupHeaderBuilder: (Message message) => SizedBox(
                    height: 40,
                    child: Center(
                      child: Card(
                        color: backGroundColor,
                        child: Padding(
                          padding: EdgeInsets.all(8),
                          child: Text(
                              DateFormat.yMMMd().format(DateTime.parse(message.createdAt!).toLocal())
                          ),
                        ),
                      ),
                    ),
                  ),
                  itemBuilder: (context, Message message) {
                    return Align(
                      alignment: message.sender!.email!.compareTo(myEmail!) == 0
                          ? Alignment.centerRight
                          : Alignment.centerLeft,
                      child: Card(
                        color: message.sender!.email!.compareTo(myEmail!) == 0
                            ? Colors.blue.shade600
                            : Colors.deepPurpleAccent ,
                        elevation: 5,
                        child: Padding(
                          padding: EdgeInsets.all(8),
                          child: Container(
                              constraints: BoxConstraints( maxWidth: MediaQuery.of(context).size.width*0.6),
                              child: Text(message.content!,style: TextStyle(fontSize: 18),)),
                        ),
                      ),
                    );
                  }),
            ),
            Container(
              color:Color.fromRGBO(44, 44, 44, 1.0),
              height: 60,
              width: double.infinity,
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      onChanged: (value) {
                        if(value.trim().isNotEmpty && checkTyping == false){
                          checkTyping = true;
                          socket.socket.emit("typing",{"id_room":widget.id,"email": myEmail});
                        }
                        if(value.trim().isEmpty){
                          checkTyping = false;
                          socket.socket.emit("stop typing",{"id_room":widget.id,"email": myEmail});
                        }
                      },
                      controller: content,
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.all(12),
                          hintText: 'Nhập tin nhắn ở đây ...'),
                      onSubmitted: (value) {
                        _sendMess( content.text, widget.id!);
                        // setState(() {
                        //   messages.add(message);
                        // });
                      },
                    ),
                  ),
                  SizedBox(width: 15,),
                  TextButton(onPressed: () {
                    _sendMess( widget.id! ,content.text.trim());
                    setState(() {
                      content.text = "";
                    });
                  }, child: Text("Gửi",style: TextStyle(fontSize: 20,fontWeight: FontWeight.bold),))
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
