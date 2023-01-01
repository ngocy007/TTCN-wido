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