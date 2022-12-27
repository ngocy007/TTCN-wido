import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/main_screen/main_screen.dart';

class Loading extends StatefulWidget {
  const Loading({Key? key}) : super(key: key);

  @override
  State<Loading> createState() => _LoadingState();
}

class _LoadingState extends State<Loading> {
  void _loadUserInfo() async {
    String token = await getToken();
    int id = await getUserId();
    if (token == '') {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => SignInPage(),
          ),
          (route) => false);
    } else {
      ApiResponse response = await getUserDetail(id);
      if (response.error == null) {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
              builder: (context) => MainScreen(user:response.data as User),
            ),
            (route) => false);
      } else if (response.error == unauthorized) {
        Navigator.of(context).pushAndRemoveUntil(
            MaterialPageRoute(
              builder: (context) => SignInPage(),
            ),
            (route) => false);
      } else {
        logout();
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('${response.error}')));
      }
    }
  }

  @override
  void initState() {
    _loadUserInfo();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      child: Center(
        child: CircularProgressIndicator(color: Colors.white),
      ),
    );
  }
}
