import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/change_password_page.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_up_page.dart';
import 'package:social_network_app/presentation/widgets/button_container_widget.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

class SendOTP extends StatefulWidget {
  const SendOTP({Key? key, required this.useCase}) : super(key: key);
  final bool useCase;

  @override
  State<SendOTP> createState() => _SendOTPState();
}

class _SendOTPState extends State<SendOTP> {
  bool _btnEnabled = false;
  final TextEditingController txtEmail = TextEditingController();
  bool loading = false;
  DateTime now = DateTime.now();
  DateTime future = DateTime.now();
  String email = " ";
  @override
  void initState() {
    super.initState();
    txtEmail.addListener(() {
      setState(() {
        _btnEnabled = txtEmail.text.isNotEmpty;
      });
    });
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
                child: Container(
                  child: CircleAvatar(
                      backgroundImage:
                          AssetImage("assets/profile_default.png")),
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                      color: secondaryColor, shape: BoxShape.circle),
                ),
              ),
              sizeVer(30),
              FormContainerWidget(
                readOnLy: false,
                hintText: "Nhập địa chỉ Email: ex@gmail.com",
                controller: txtEmail,
              ),
              sizeVer(15),
              loading
                  ? Center(child: CircularProgressIndicator())
                  : ButtonContainerWidget(
                      onPress:
                          _btnEnabled
                              ? () {
                                  setState(() {
                                    loading = true;
                                    if(email != txtEmail.text){
                                      future =DateTime.now().add(Duration(minutes: 2));
                                    }
                                    if(future.difference(DateTime.now()).inSeconds <= 0 ){
                                      future =DateTime.now().add(Duration(minutes: 2));
                                    }
                                    validateEmail();
                                  });
                                }
                              : null,
                      color: blueColor,
                      text: "Tiếp",
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
                    "Bạn đã có tài khoản? ",
                    style: TextStyle(color: primaryColor),
                  ),
                  InkWell(
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => SignInPage()));
                    },
                    child: Text(
                      "Đăng nhập",
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

  void validateEmail() {
    final bool isValid = EmailValidator.validate(txtEmail.text.trim());
    if (isValid) {
      _sendOTP();
    } else {
      loading = false;
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('Email không hợp lệ'),duration: Duration(milliseconds: 800),));
    }
  }

  void _sendOTP() async {
    ApiResponse response;
    if(widget.useCase){
      response = await sendOTPCreate(txtEmail.text);
    }else {
      response = await sendOTPForgot(txtEmail.text);
    }
    setState(() {
      loading = !loading;
    });
    if (response.error == null) {
      widget.useCase ? Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => SignUpPage(
                  emailTXT: txtEmail,
                )),
      ) :
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) {
              return ChangePasswordPage(
                time: future,
                emailTXT: txtEmail.text,
              );
            }
        ),
      ).then((value) {
        future = (value as Map)['future'];
        email = (value as Map)['email'];
        print(txtEmail.text);
      });
    } else {
      setState(() {
        loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}'),duration: Duration(milliseconds: 1000)));
    }
  }
}
