import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/api/socket.dart';
import 'package:social_network_app/data/models/message/room_chat.dart';
import 'package:social_network_app/data/service/message_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/Message/room_chat_page.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class ListMessagePage extends StatefulWidget {
  final String? email;
  const ListMessagePage({Key? key, required this.email}) : super(key: key);

  @override
  State<ListMessagePage> createState() => _ListMessagePageState();
}

class _ListMessagePageState extends State<ListMessagePage> {
  bool _loading = true;
  List<Chat> rooms = [];
  Future<dynamic> _getRoom() async {
    ApiResponse response = await getRoomChat();
    if (response.error == null) {
      setState(() {
        rooms = response.data as List<Chat>;
        _loading = false;
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
  @override
  void initState() {

    _getRoom();
    ApiSocket socket = ApiSocket();
    socket.socket.emit("setup",widget.email);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundColor,
      appBar: AppBar(
        backgroundColor: backGroundColor,
        title: Text("Tin nhắn"),
        actions: [
          IconButton(onPressed: () {

          }, icon: Icon(Icons.add))
        ],
      ),
      body: _loading == true
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
        itemCount: rooms.length,
              itemBuilder: (context, index) {
                return ListTile(
                  onTap: () => Navigator.of(context).push(MaterialPageRoute(builder: (context) => RoomChatPage(name:rooms[index].chatName,id: rooms[index].id),)),
                  title: Text(rooms[index].chatName!),
                  subtitle:rooms[index].message?.id == null ?  SizedBox() : Text(rooms[index].message!.content!),
                );
              },
            ),
    );
  }
}
