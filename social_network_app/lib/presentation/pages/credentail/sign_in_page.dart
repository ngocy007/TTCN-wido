import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/user/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_up_page.dart';
import 'package:social_network_app/presentation/pages/main_screen/main_screen.dart';
import 'package:social_network_app/presentation/widgets/button_container_widget.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({Key? key}) : super(key: key);

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  bool _btnEnabled1 = false;
  bool _btnEnabled2 = false;
  final TextEditingController txtEmail = TextEditingController();
  final TextEditingController txtPassword = TextEditingController();
  bool loading = false;

  @override
  void initState() {
    super.initState();
    txtEmail.addListener(() {
      setState(() {
        _btnEnabled1 = txtEmail.text.isNotEmpty;
      });
    });
    txtPassword.addListener(() {
      setState(() {
        _btnEnabled2 = txtPassword.text.isNotEmpty;
      });
    });
  }

  @override
  void dispose() {
    txtEmail.dispose();
    txtPassword.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: Scaffold(
        backgroundColor: backGroundColor,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Flexible(
                child: Container(),
                flex: 2,
              ),
              Center(
                  child: SvgPicture.asset(
                "assets/ic_instagram.svg",
                color: primaryColor,
              )),
              sizeVer(30),
              FormContainerWidget(
                hintText: "Email",
                controller: txtEmail,
              ),
              sizeVer(15),
              FormContainerWidget(
                hintText: "Mật khẩu",
                isPasswordField: true,
                controller: txtPassword,
              ),
              sizeVer(15),
              loading
                  ? Center(child: CircularProgressIndicator())
                  : ButtonContainerWidget(
                      onPress: _btnEnabled1 && _btnEnabled2
                          ? () {
                              setState(() {
                                loading = true;
                                _login();
                              });
                            }
                          : null,
                      color: blueColor,
                      text: "Đăng nhập",
                    ),
              Flexible(
                child: Container(),
                flex: 2,
              ),
              Divider(
                color: secondaryColor,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Chưa có tài khoản? ",
                    style: TextStyle(color: primaryColor),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SignUpPage()));
                    },
                    child: Text(
                      "Đăng ký",
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: primaryColor),
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }

  void _login() async {
    ApiResponse response = await login(txtEmail.text, txtPassword.text);
    if (response.error == null) {
      setState(() {
        loading = false;
      });
      print(response.data);
      _saveAndRedirectToHome(response.data as User);
    } else {
      setState(() {
        loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  void _saveAndRedirectToHome(User user) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    await pref.setString('token', user.token ?? '');
    await pref.setInt('id_user', user.id_user?? 0);
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => MainScreen()),
      (route) => (false),
    );
  }
}
