import 'package:social_network_app/data/models/user/user.dart';

class Comment {
  int? id_com;
  int? id_post;
  String? content;
  int? countRep;
  User? user;
  String? createdAt;
  Comment({this.id_com, this.id_post, this.content, this.countRep, this.user, this.createdAt});

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
    print(json);
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
}

class Photo {
  int? id_photo;
  String? url;
  String? belong;
  int? id_post;

  Photo({this.id_photo, this.url, this.belong, this.id_post});

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
        url: json["url"] ?? "",
        belong: json["belong"] ?? "",
        id_post: json["id_post"] ?? 0,
        id_photo: json["id_photo"] ?? 0);
  }
}

class Post {
  int? id_post;
  String? content;
  int? id_user;
  String? createdAt;
  User? user;
  int? countLike;
  int? countCmt;
  bool? isLike;
  List<Photo>? photos;
  List<Comment>? comments;

  Post(
      {this.id_post,
      this.content,
      this.id_user,
      this.createdAt,
      this.user,
      this.countLike,
      this.countCmt,
      this.photos,
      this.comments,
      this.isLike});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
        id_post: json['id_post'] ?? 0,
        content: json['content'] ?? "",
        createdAt: json['createdAt'] ?? "",
        countLike: json['countLike'] ?? 0,
        id_user: json['id_user'] ?? 0,
        countCmt: json['countCmt'],
        isLike: json['isLike'],
        comments: json["Comments"] != null
            ? (json["Comments"] as List)
                .map((c) => Comment.fromJson(c))
                .toList()
            : [],
        user: json["User"] != null
            ? User(
                id_user: json['User']['id_user'] ?? 0,
                name: json['User']['name'] ?? "",
                image: json['User']['image'] ?? "",
              )
            : User(),
        photos: json["Photos"] != null
            ? (json["Photos"] as List).map((p) => Photo.fromJson(p)).toList()
            : []);
  }
}
