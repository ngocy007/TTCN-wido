import 'dart:convert';
import 'dart:io';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:http/http.dart' as http;

Future<ApiResponse> getPosts(int limit , int page) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$getPostUrl?_limit=$limit&_page=$page"),
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

// Bình luận
Future<ApiResponse> getComments(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$getDetailPost${id}"),
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

// Tạo bài viết
Future<ApiResponse> createPost(String content, List file) async {
  // ApiResponse apiResponse = ApiResponse();
  // String token = await getToken();
  // var headersList = {
  //   "x-access-token": '$token',
  //   'Accept': '*/*',
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // };
  // var url = Uri.parse(createPost);
  //
  //
  // var req = http.Request('POST', url);
  // req.headers.addAll(headersList);
  // req.bodyFields = {
  //   'file' : file[0]!
  // };
  //
  // var res = await req.send();
  // final resBody = await res.stream.bytesToString();
  //
  // if (res.statusCode >= 200 && res.statusCode < 300) {
  //   print(resBody);
  // }
  // else {
  //   print(res.reasonPhrase);
  // }
  // return apiResponse;
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    // final listFile = {};
    // file.forEach((element) {
    //   listFile.addAll({'file':element});
    // });
    var data = {
      "file": file,
    };
    print(data);
    final response =
        await http.post(body: data, Uri.parse(createPostURL), headers: {
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      "x-access-token": '$token'
    });
    print(response.statusCode);
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
Future<ApiResponse> createCMT(String content, int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(Uri.parse(createCMTURL),
        headers: {'Accept': 'application/json', "x-access-token": '$token'},
        body: {"content": content, "id_post": "${id}"});
    print(response.body);
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
    print(response.statusCode);
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

// Xóa bài viết
String? getStringImage(File? file) {
  if (file == null) return null;
  return "data:image/png;base64,${base64Encode(file.readAsBytesSync())}";
}
