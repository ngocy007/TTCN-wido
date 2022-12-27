import 'package:flutter/material.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sendOTP.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/widgets/button_container_widget.dart';
import 'package:social_network_app/presentation/widgets/form_container_widget.dart';

class ChangePasswordPage extends StatefulWidget {
  final String emailTXT;

  const ChangePasswordPage({Key? key, required this.emailTXT})
      : super(key: key);

  @override
  State<ChangePasswordPage> createState() => _ChangePasswordPageState();
}

class _ChangePasswordPageState extends State<ChangePasswordPage> {
  bool _loading = false;
  bool _btnEnabled1 = false;
  bool _btnEnabled2 = false;
  bool _isVerify = false;
  final TextEditingController txtConfirmPassword = TextEditingController();
  final TextEditingController txtPassword = TextEditingController();

  @override
  void initState() {
    super.initState();
    Future<void>.delayed(Duration.zero, () {
      _showSnackbar();
    });
    txtPassword.addListener(() {
      setState(() {
        _btnEnabled1 = txtPassword.text.isNotEmpty;
      });
    });
    txtConfirmPassword.addListener(() {
      setState(() {
        _btnEnabled2 = txtConfirmPassword.text.isNotEmpty;
      });
    });
  }

  void _isOTP(otp) async {
    ApiResponse response = await verifyOTP(widget.emailTXT, otp);
    setState(() {
      _loading = false;
    });
    if (response.error == null) {
      setState(() {
        _isVerify = true;
      });
    } else {
      setState(() {
        _loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  bool _verifyPass() {
    if (txtPassword.text.trim().length < 6) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Mật khẩu phải lớn hơn 6 ký tự")));
      return false;
    } else if (txtPassword.text.trim() != txtConfirmPassword.text.trim()) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Xác minh mật khẩu không khớp với mặt khẩu")));
      return false;
    } else {
      return true;
    }
  }

  void _showSnackbar() {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.fromLTRB(10, 0, 10, 50),
      content: Text(
        "Đã gửi mã OTP gồm 6 chữ số về địa chỉ email ${widget.emailTXT}, vui lòng kiểm tra!",
      ),
      duration: Duration(seconds: 8),
    ));
  }
  Future<void> _forgotPass() async{
    ApiResponse response =
        await forgotPass(widget.emailTXT, txtPassword.text);
    if (response.error == null) {
      setState(() {
        _loading = true;
      });
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(
            builder: (context) =>
                SignInPage(),
          ),
              (route) => false);
    } else {
      setState(() {
        _loading = !_loading;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
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
              _isVerify == false
                  ? Column(
                      children: [
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
                                onPressed: () {}, child: Text("Gửi lại"))
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
                      ],
                    )
                  : Column(
                      children: [
                        FormContainerWidget(
                          readOnLy: false,
                          hintText: "Mật khẩu mới",
                          isPasswordField: true,
                          controller: txtPassword,
                        ),
                        sizeVer(15),
                        FormContainerWidget(
                          readOnLy: false,
                          hintText: "Xác nhận mật khẩu mới",
                          isPasswordField: true,
                          controller: txtConfirmPassword,
                        ),
                        sizeVer(15),
                        _loading
                            ? Center(child: CircularProgressIndicator())
                            : ButtonContainerWidget(
                                onPress: _btnEnabled1 && _btnEnabled2
                                    ? () {
                                        setState(() {
                                          _loading = true;
                                          _verifyPass() ? _forgotPass() :  _loading = false;
                                        });
                                      }
                                    : null,
                                color: blueColor,
                                text: "Hoàn tất",
                              ),
                      ],
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
                              builder: (context) => SendOTP(
                                    useCase: true,
                                  )));
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
}
