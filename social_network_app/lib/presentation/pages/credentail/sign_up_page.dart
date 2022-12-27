import 'package:flutter/material.dart';
import 'package:flutter_countdown_timer/countdown.dart';
import 'package:flutter_countdown_timer/countdown_controller.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/widgets/button_container_widget.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

import '../../../consts.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({Key? key, required this.emailTXT}) : super(key: key);
  final TextEditingController emailTXT;

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  CountdownController countdownController =
      CountdownController(duration: Duration(seconds: 20));
  bool _btnEnabled2 = false;
  bool _btnEnabled3 = false;
  bool _btnEnabled4 = false;
  bool _btnEnabled5 = false;
  final TextEditingController txtEmail = TextEditingController();
  final TextEditingController txtPassword = TextEditingController();
  final TextEditingController txtName = TextEditingController();
  final TextEditingController txtConfirmPassword = TextEditingController();
  final TextEditingController txtOTP = TextEditingController();
  bool loading = false;
  String title = "Gửi lại";
  bool timer = false;

  @override
  void initState() {
    super.initState();
    Future<Null>.delayed(Duration.zero, () {
      _showSnackbar();
    });
    txtEmail.text = widget.emailTXT.text;
    txtPassword.addListener(() {
      setState(() {
        _btnEnabled2 = txtPassword.text.isNotEmpty;
      });
    });
    txtName.addListener(() {
      setState(() {
        _btnEnabled3 = txtName.text.isNotEmpty;
      });
    });
    txtConfirmPassword.addListener(() {
      setState(() {
        _btnEnabled4 = txtConfirmPassword.text.isNotEmpty;
      });
    });
  }

  void _showSnackbar() {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.fromLTRB(10, 0, 10, 50),
      content: Text(
        "Đã gửi mã OTP gồm 6 chữ số về địa chỉ email ${txtEmail.text}, vui lòng kiểm tra!",
      ),
      duration: Duration(seconds: 8),
    ));
  }

  @override
  void dispose() {
    countdownController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
            SvgPicture.asset(
              "assets/ic_instagram.svg",
              color: primaryColor,
            ),
            sizeVer(15),
            FormContainerWidget(
              hintText: "Email",
              readOnLy: true,
              controller: txtEmail,
            ),
            sizeVer(15),
            FormContainerWidget(
              hintText: "Tên",
              readOnLy: false,
              controller: txtName,
            ),
            sizeVer(15),
            FormContainerWidget(
              hintText: "Mật khẩu",
              isPasswordField: true,
              readOnLy: false,
              controller: txtPassword,
            ),
            sizeVer(15),
            FormContainerWidget(
              hintText: "Xác nhận mật khẩu",
              isPasswordField: true,
              readOnLy: false,
              controller: txtConfirmPassword,
            ),
            sizeVer(15),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Nhập mã OTP để hoàn tất đăng ký",
                  style: TextStyle(
                      color: primaryColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w600),
                ),
                ElevatedButton(
                  // style: ButtonStyle(
                  //   backgroundColor:
                  //       MaterialStatePropertyAll<Color>(Colors.white),
                  // ),
                  onPressed: () {
                    setState(() {
                      timer = true;
                      if (!countdownController.isRunning) {
                        ///start
                        countdownController.start();
                        if (countdownController.stop()) {
                          setState(() {
                            timer = false;
                          });
                        }
                      }
                    });
                  },
                  child: timer == false
                      ? Text("Gửi lại")
                      : Countdown(countdownController: countdownController),
                )
              ],
            ),
            sizeVer(5),
            OtpTextField(
              onSubmit: (String code) {
                _isOTP(code);
              },
              numberOfFields: 6,
              margin: EdgeInsets.symmetric(horizontal: 10),
              borderColor: Color(0xFF512DA8),
              showFieldAsBox: true,
            ),
            sizeVer(15),
            loading
                ? Center(
                    child: CircularProgressIndicator(),
                  )
                : ButtonContainerWidget(
                    color: blueColor,
                    text: "Đăng ký",
                    onPress: _btnEnabled2 &&
                            _btnEnabled3 &&
                            _btnEnabled4 &&
                            _btnEnabled5
                        ? () {
                            setState(() {
                              loading = true;
                              _verifyPass();
                              // _register();
                            });
                          }
                        : null,
                  ),
            Flexible(
              child: Container(),
              flex: 1,
            ),
            Divider(
              color: secondaryColor,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Đã có tài khoản? ",
                  style: TextStyle(color: primaryColor),
                ),
                InkWell(
                  onTap: () {
                    Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(builder: (context) => SignInPage()),
                        (route) => false);
                  },
                  child: Text(
                    "Đăng nhập.",
                    style: TextStyle(
                        fontWeight: FontWeight.bold, color: primaryColor),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  void _verifyPass() {
    if (txtPassword.text.trim().length < 6) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Mật khẩu phải lớn hơn 6 ký tự")));
    }
    if (txtPassword.text.trim() != txtConfirmPassword.text.trim()) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Xác minh mật khẩu không khớp với mặt khẩu")));
    }
  }

  void _isOTP(otp) async {
    ApiResponse response = await verifyOTP(txtEmail.text, otp);
    setState(() {
      loading = !loading;
    });
    if (response.error == null) {
      setState(() {
        _btnEnabled5 = true;
      });
    } else {
      setState(() {
        loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  void _register() async {
    setState(() {
      loading = !loading;
    });
    Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(
          builder: (context) =>
              SignInPage(),
        ),
        (route) => false);
    ApiResponse response =
        await register(txtName.text, txtEmail.text, txtPassword.text);
    if (response.error == null) {
    } else {
      setState(() {
        loading = !loading;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }
}
