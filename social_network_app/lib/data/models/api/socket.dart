import 'package:socket_io_client/socket_io_client.dart' as IO;
class ApiSocket{
  IO.Socket? socket;

  Socket(){
    socket = IO.io(
    'http://192.168.2.122:8000',
    IO.OptionBuilder().setTransports(['websocket']) // for Flutter or Dart VM// optional
        .build());
    // socket.onConnect((_) {
    // print('connect');
    // });
    // // Replace 'onConnect' with any of the above events.
    // socket.onConnect((_) {
    // print('connect');
    // socket.emit('msg','test');
    // });
    // socket.on('connect_error', (data) {
    // print(data);
    // });
    // socket.onDisconnect((_) => print('disconnect'));
  }
}