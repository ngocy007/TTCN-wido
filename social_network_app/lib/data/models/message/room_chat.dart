import 'package:social_network_app/data/models/message/message.dart';

class Chat {
  String? id;
  String? chatName;
  bool? isGroupChat;
  List<String>? users;
  String? groupAdmin;
  String? createdAt;
  Message? message;

  Chat(
      {this.id,
      this.chatName,
      this.isGroupChat,
      this.users,
      this.groupAdmin,
      this.createdAt,
      this.message});

  factory Chat.fromJson(Map<String, dynamic> json) {
    return Chat(
      id: json["_id"] ?? "",
      chatName: json["chatName"] ?? "",
      isGroupChat: json["isGroupChat"] ?? false,
      groupAdmin: json["groupAdmin"] ?? "",
      createdAt: json["createdAt"] ?? "",
      message: json["latestMessage"] != null
          ? Message.fromJson(json["latestMessage"])
          : Message(),
    );
  }
  factory Chat.fromJson2(Map<String, dynamic> json) {
    return Chat(
      id: json["_id"] ?? "",
      chatName: json["chatName"] ?? "",
      isGroupChat: json["isGroupChat"] ?? false,
      groupAdmin: json["groupAdmin"] ?? "",
      createdAt: json["createdAt"] ?? "",
      message: json["latestMessage"] != null
          ? Message.fromJson2(json["latestMessage"])
          : Message(),
    );
  }
}
