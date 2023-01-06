import 'package:social_network_app/data/models/user/user.dart';

class Comment {
  int? id_com;
  int? id_post;
  String? content;
  int? countRep;
  User? user;
  int? reply;
  String? createdAt;
  Comment({this.id_com, this.id_post, this.content, this.countRep, this.user, this.createdAt, this.reply});

  factory Comment.fromJson2(Map<String, dynamic> json) {
    return Comment(
        user: json["User"] != null
            ? User(
          id_user: json['User']['id_user'] ?? 0,
          name: json['User']['name'] ?? "",
          image: json['User']['image'] ?? "",
        )
            : User(),
        id_com: json["comment"]["id_com"] ?? 0,
        id_post: json["comment"]["id_post"]??0,
        content: json["comment"]["content"]??"",
        createdAt: json["comment"]["createdAt"]??"",
        countRep: json["comment"]["countRep"]??0);
  }
  factory Comment.fromJson(Map<String, dynamic> json) {
    return Comment(
        user: json["User"] != null
            ? User(
          id_user: json['User']['id_user'] ?? 0,
          name: json['User']['name'] ?? "",
          image: json['User']['image'] ?? "",
        )
            : User(),
        id_com: json["id_com"] ?? 0,
        id_post: json["id_post"]??0,
        content: json["content"]??"",
        createdAt: json["created_at"]??"",
        countRep: json["countRep"]??0);
  }

  factory Comment.fromJson3(Map<String, dynamic> json) {
    return Comment(
        user: json["User"] != null
            ? User(
          id_user: json['User']['id_user'] ?? 0,
          name: json['User']['name'] ?? "",
          image: json['User']['image'] ?? "",
        )
            : User(),
        id_com: json["id_com"] ?? 0,
        id_post: json["id_post"]??0,
        content: json["content"]??"",
        createdAt: json["createdAt"]??"",
        countRep: json["countRep"]??0,
        reply: json["reply"]??-1
    );
  }
}