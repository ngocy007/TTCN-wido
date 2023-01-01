import 'dart:convert';

import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/message/room_chat.dart';
import 'package:social_network_app/data/models/message/message.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:http/http.dart' as http;

Future<ApiResponse> getRoomChat() async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(
        Uri.parse(getRoomURL),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body) as List)
            .map((e) => Chat.fromJson2(e))
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

// Lấy ra tin nhắn
Future<ApiResponse> getMessage(String id) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.get(
        Uri.parse(getMessURL + id),
        headers: {'Accept': 'application/json', "x-access-token": '$token'});
    switch (response.statusCode) {
      case 200:
        apiResponse.data = (jsonDecode(response.body) as List)
            .map((e) => Message.fromJson(e))
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

// Nhắn tin
Future<ApiResponse> sendMessage(String chatId, String content) async {
  ApiResponse apiResponse = ApiResponse();
  try {
    String token = await getToken();
    final response = await http.post(
        Uri.parse(sendMessURL),
        headers: {'Accept': 'application/json', "x-access-token": '$token'},body: {"chatId":chatId, "content":content});
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