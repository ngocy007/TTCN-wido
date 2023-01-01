import 'package:social_network_app/config/constant.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
class ApiSocket{
  IO.Socket  socket = IO.io(
  "http://192.168.1.5:8000",
  IO.OptionBuilder().setTransports(['websocket']) // for Flutter or Dart VM// optional
      .build());
  ApiSocket()
  {
    socket.onConnect((_) {
      print('connect');
    });
  }
}