class Sender{
  String? id;
  String? name;
  String? email;
  String? pic;

  Sender({this.id, this.name, this.email, this.pic});

  factory Sender.fromJson(Map<String, dynamic> json) {

    return Sender(
      id: json["_id"] ?? "",
      name: json["name"] ?? "",
      email: json["email"] ?? "",
      pic: json["pic"] ?? "",
    );
  }
}