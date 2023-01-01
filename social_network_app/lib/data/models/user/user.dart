import 'package:intl/intl.dart';
import 'package:social_network_app/data/models/post/post.dart';

class Follow {
  String? name;
  String? image;
  int? id_user;

  Follow({this.name, this.image, this.id_user});

  factory Follow.fromJson1(Map<String, dynamic> json) {
    return Follow(
      id_user: json["follower"]['id_user'] ?? 0,
      name: json["follower"]['name'] ?? "",
      image: json["follower"]['image'] ?? "",
    );
  }

  factory Follow.fromJson2(Map<String, dynamic> json) {
    return Follow(
      id_user: json["followee"]['id_user'] ?? 0,
      name: json["followee"]['name'] ?? "",
      image: json["followee"]['image'] ?? "",
    );
  }
}

class User {
  int? id_user;
  String? name;
  String? image;
  String? email;
  String? token;
  String? dob;
  int? role;
  String? content;
  String? password;
  List<Post>? posts;
  String? createdAt;
  String? updatedAt;
  int? gender;
  int? countFollower;
  int? countFollowee;
  // List<Follow>? follower;
  // List<Follow>? followee;

  User({
    this.id_user,
    this.name,
    this.image,
    this.email,
    this.token,
    this.dob,
    this.role,
    this.content,
    this.password,
    this.posts,
    this.createdAt,
    this.updatedAt,
    this.gender,
    this.countFollowee,
    this.countFollower,
  });
  factory User.fromListJson(Map<String,dynamic> json){
    return User(
      id_user: json['id_user']??0,
      name: json['name']??"",
      image: json['image']??"",
      email: json['email']??""
    );
  }
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        id_user: json['user']['id_user']??0,
        name: json['user']['name']??"",
        email: json['user']['email']??"",
        image: json['user']['image']??"",
        password: json['user']['password']??"",
        content: json['user']['content']??"",
        dob: json['user']['dob']??DateFormat('dd-MM-yyyy').format(DateTime.now()),
        role: json['user']['role']??1,
        gender: json['user']['gender']??0,
        countFollowee: json['user']['countFollowee']??0,
        countFollower: json['user']['countFollower']??0,
        posts: json['user']["Posts"] != null
            ? (json['user']["Posts"] as List)
                .map((p) => Post.fromJson(p))
                .toList()
            : [],
        token: json['token']??"");
  }
}
