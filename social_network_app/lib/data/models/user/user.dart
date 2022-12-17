class User {
  int? id_user;
  String? name;
  String? image;
  String? email;
  String? token;

  User({this.id_user, this.name, this.image, this.email, this.token});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
        id_user: json['user']['id_user'],
        name: json['user']['name'],
        email: json['user']['email'],
        image: json['user']['image'],
        token: json['token']);
  }
}
