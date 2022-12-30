import 'package:social_network_app/data/models/message/sender.dart';

class Message{
  String? id;
  Sender? sender;
  String? content;
  String? chat;
  String? time;
  String? date;
  List<dynamic>? readBy;
  String? createdAt;

  Message({this.id, this.sender, this.content, this.chat, this.time,
    this.date,this.readBy, this.createdAt});

  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
        id: json["_id"] ?? "",
        sender: json["sender"] != null ? Sender.fromJson(json["sender"]) : Sender() ,
        content: json["content"] ?? "",
        chat: json["chat"] ?? "",
        time: json["time"]?? "",
        date: json["date"] ?? "",
        readBy: json["readBy"]??[],
      createdAt: json["createdAt"]??""
    );
  }
  factory Message.fromJson2(Map<String, dynamic> json) {
    return Message(
        id: json["_id"] ?? "",
        sender: json["sender"] != null ? Sender(id: json["sender"]) : Sender() ,
        content: json["content"] ?? "",
        chat: json["chat"] ?? "",
        time: json["time"]?? "",
        date: json["date"] ?? "",
        readBy: json["readBy"]??[],
        createdAt: json["createdAt"]??""
    );
  }
}