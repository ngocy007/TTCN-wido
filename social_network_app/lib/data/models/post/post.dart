import 'package:social_network_app/data/models/comment/comment.dart';
import 'package:social_network_app/data/models/post/photo.dart';
import 'package:social_network_app/data/models/user/user.dart';





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
