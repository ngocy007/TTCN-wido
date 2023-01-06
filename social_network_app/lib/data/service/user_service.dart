import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:async/async.dart';
// Đăng nhập
Future<ApiResponse> login(String email, String password) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    // Kết nối với API đăng nhập bằng thư viện http.dart
    // link API: loginURL <=> http://localhost:8000/api/user/login
    final response = await http.post(Uri.parse(loginURL),
        headers: {"Accept": "application/json"},
        body: {'email': email, 'password': password});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = User.fromJson(jsonDecode(response.body));

        break;
      case 401:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      case 400:
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

// Đăng xuất
Future<ApiResponse> logoutUser() async {
  ApiResponse apiResponse = ApiResponse();
  try {
    final response = await http.get(Uri.parse(logoutURL),
        headers: {"Accept": "application/json"});
    switch (response.statusCode) {
      case 200:
        break;
      case 401:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      case 400:
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

// Đăng ký
Future<ApiResponse> register(String name, String email, String password) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    final response = await http.post(Uri.parse(regisTerURL),
        headers: {'Content-Type': 'application/json'},
        body: {'name': name, 'email': email, 'password': password});
    switch (response.statusCode) {
      case 200:
        break;
      case 401:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    apiResponse.error = serverError;
  }

  return apiResponse;
}

// Cập nhật người dùng
Future<ApiResponse> updateUser(
    String content, String dob, int gender, String name, File? image) async {
  ApiResponse apiResponse = ApiResponse();
  try {

    String token = await getToken();
    var headersList = {"x-access-token": '$token'};
    var uri = Uri.parse(updateUserURL);
    var req = http.MultipartRequest('PUT', uri);
    req.headers.addAll(headersList);
    req.fields.addAll({"content": content, "dob":"$dob", "gender": "${gender}", "name": name});
    if(image != null){
      req.files.add(await http.MultipartFile.fromPath('image', image.path));
    }

    var response = await req.send();
    switch (response.statusCode) {
      case 200:
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

// Thông tin người dùng
Future<ApiResponse> getUserDetail(int? id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$userURL${id}"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = User.fromJson(jsonDecode(response.body));
        break;
      case 401:
        apiResponse.error = unauthorized;
        break;
      case 400:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    print("a" + "${e}");
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Gửi OTP Đăng ký
Future<ApiResponse> sendOTPCreate(String email) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(Uri.parse(sendOTP1), headers: {
      "Accept": "application/json",
      "x-access-token": '$token'
    }, body: {
      'email': email,
    });
    switch (response.statusCode) {
      case 200:
        apiResponse.data = jsonDecode(response.body)['message'];
        break;
      case 404:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Gửi OTP Quên mật khẩu
Future<ApiResponse> sendOTPForgot(String email) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(Uri.parse(sendOTP2), headers: {
      "Accept": "application/json",
      "x-access-token": '$token'
    }, body: {
      'email': email,
    });
    switch (response.statusCode) {
      case 200:
        apiResponse.data = jsonDecode(response.body)['message'];
        break;
      case 404:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Xác thực OTP
Future<ApiResponse> verifyOTP(String email, String otp) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(Uri.parse(veOTP),
        headers: {"Accept": "application/json", "x-access-token": '$token'},
        body: {'email': email, 'otp': otp});
    switch (response.statusCode) {
      case 200:
        break;
      case 404:
        apiResponse.error = jsonDecode(response.body)['message'];
        break;
      default:
        apiResponse.error = wrong;
        break;
    }
  } catch (e) {
    apiResponse.error = serverError;
  }
  return apiResponse;
}

// Theo dõi người dùng
Future<ApiResponse> follow(int id, int id_user) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(Uri.parse("$followURL${id}"),
        headers: {"Accept": "application/json", "x-access-token": '$token'},body: {"id_user" : "$id_user"});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = jsonDecode(response.body)["isFollowed"];
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

// Kiểm tra theo dõi hay chưa
Future<ApiResponse> checkFollow(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$followURL${id}"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = jsonDecode(response.body)["status"];
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

// Lấy ra tất cả người theo dõi
Future<ApiResponse> getFollowers(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$followersURL${id}"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body)["users"] as List)
            .map((user) => Follow.fromJson1(user))
            .toList();
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

// Lấy ra tất cả người bạn đang theo dõi
Future<ApiResponse> getFollowees(int id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(Uri.parse("$followeesURL${id}"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body)["users"] as List)
            .map((user) => Follow.fromJson2(user))
            .toList();
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

//Tìm kiếm người dùng
Future<ApiResponse> searchUser(String q) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();

    final response = await http.get(Uri.parse("$searchURL$q&limit=5"),
        headers: {"Accept": "application/json", "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body)["users"] as List)
            .map((user) => User.fromListJson(user))
            .toList();
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

// Quên mật khẩu
Future<ApiResponse> forgotPass(String email, String pass) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();

    final response = await http.post(Uri.parse(forgotPassURL), headers: {
      "Accept": "application/json",
      "x-access-token": '$token',
    }, body: {
      "email": email,
      "password": pass
    });
    switch (response.statusCode) {
      case 200:
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

// Lấy Token
Future<String> getToken() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return pref.getString("token") ?? "";
}

// Lấy Email
Future<String> getEmail() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return pref.getString("email") ?? "";
}

// Lấy tên
Future<String> getName() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return pref.getString("name") ?? "";
}

// Lấy id người dùng
Future<int> getUserId() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return pref.getInt("id_user") ?? 0;
}

// Đăng xuất
Future<bool> logout() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return await pref.remove("token");
}

// Đăng xuất
Future<String> getImage() async {
  SharedPreferences pref = await SharedPreferences.getInstance();
  return pref.getString("image") ?? "";
}

