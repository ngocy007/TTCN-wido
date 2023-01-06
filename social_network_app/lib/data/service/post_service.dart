import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/data/models/comment/comment.dart';
import 'package:social_network_app/data/models/message/message.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/user_service.dart';

// Tải bài viết
Future<ApiResponse> getPosts(int limit, int page) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(
        Uri.parse("$getPostsURL?_limit=$limit&_page=$page"),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body)["posts"] as List)
            .map((post) => Post.fromJson(post))
            .toList();
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Xem chi tiết bài viết
Future<ApiResponse> getDetail(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$getDetailPost$id"),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = Post.fromJson(jsonDecode(response.body)["post"]);
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Bình luận
Future<ApiResponse> getComments(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$getDetailPost$id"),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.error = "";
        apiResponse.data =
            (jsonDecode(response.body)["post"]["Comments"] as List)
                .map((c) => Comment.fromJson(c))
                .toList();
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Xóa bình luận
Future<ApiResponse> deleteComment(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.delete(Uri.parse("$deleteCMTURL$id"),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Tạo bài viết
Future<ApiResponse> createPost(String content, List<String> files) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    var client = http.Client();
    var headersList = {"x-access-token": '$token'};
    var uri = Uri.parse(createPostURL);
    var req = http.MultipartRequest('POST', uri);
    req.headers.addAll(headersList);
    req.fields.addAll({"content": content});
    if (files.isNotEmpty) {
      files.forEach((element) async {
        http.MultipartFile multipartFile =
            await http.MultipartFile.fromPath("multiple", element);
        req.files.add(multipartFile);
      });
    }

    var response = await req.send();
    switch (response.statusCode) {
      case 200:
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Xóa bài viết
Future<ApiResponse> deletePost(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.delete(Uri.parse("$getDetailPost$id"),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Tạo bình luận
Future<ApiResponse> createCMT(String content, int id, int? reply) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    print(reply);
    var body = reply == -1
        ? {"content": content, "id_post": "${id}"}
        : {"content": content, "id_post": "${id}", "reply": "${reply}" };
    final response = await http.post(Uri.parse(createCMTURL),
        headers: {'Accept': 'application/json', "x-access-token": '$token'},
        body: body);
    switch (response.statusCode) {
      case 200:
        apiResponse.data = Comment.fromJson2(jsonDecode(response.body));
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Thích bài viết
Future<ApiResponse> likePost(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();

    final response = await http.post(Uri.parse("$likeURl$id"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = jsonDecode(response.body)["like"];
        break;
      case 404:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Lấy trả lời bình luận
Future<ApiResponse> getReplies(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();

    final response = await http.get(Uri.parse("$getRepliesURL$id"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body)["replies"] as List)
            .map((c) => Comment.fromJson3(c))
            .toList();
        print((apiResponse.data as List<Comment>)[0].id_post);
        break;
      case 404:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print(e);
    apiResponse.error = serverError;
  }
  return apiResponse;
}
