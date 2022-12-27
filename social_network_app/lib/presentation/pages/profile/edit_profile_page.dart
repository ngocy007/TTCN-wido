import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/widgets/profile_form_widget.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({Key? key}) : super(key: key);

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  TextEditingController nameTXT = TextEditingController();
  TextEditingController genderTXT = TextEditingController();
  TextEditingController contentTXT = TextEditingController();
  TextEditingController dobTXT = TextEditingController();
  TextEditingController imgTXT = TextEditingController();

  User? user;
  bool _loading = true;
  Future<dynamic> _updateUser() async{
    ApiResponse response = await updateUser(contentTXT.text, dobTXT.text, int.parse(genderTXT.text), nameTXT.text);
    if (response.error == null) {
      setState(() {
        user = response.data as User;
        nameTXT.text = user?.name ?? "";
        genderTXT.text = user?.gender == 0 ? "nữ" : "nam";
        dobTXT.text = user?.dob ?? DateTime.now().toString();
        contentTXT.text = user?.content ?? "";
        imgTXT.text = user?.image ?? "";
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => SignInPage(),
          ),
              (route) => false));
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  void _getUser() async {
    ApiResponse response = await getUserDetail(await getUserId());
    if (response.error == null) {
      setState(() {
        user = response.data as User;
        nameTXT.text = user?.name ?? "";
        genderTXT.text = user?.gender == 0 ? "nữ" : "nam";
        dobTXT.text = user?.dob ?? DateTime.now().toString();
        contentTXT.text = user?.content ?? "";
        imgTXT.text = user?.image ?? "";
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => SignInPage(),
          ),
          (route) => false));
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  @override
  void initState() {
    _getUser();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return _loading
        ? Center(
            child: CircularProgressIndicator(),
          )
        : GestureDetector(
            onTap: () {
              FocusManager.instance.primaryFocus?.unfocus();
            },
            child: Scaffold(
              backgroundColor: backGroundColor,
              appBar: AppBar(
                backgroundColor: backGroundColor,
                title: Text("Chỉnh sửa thông tin"),
                leading: GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: Icon(
                      Icons.close,
                      size: 32,
                    )),
                actions: [
                  Padding(
                    padding: const EdgeInsets.only(right: 10.0),
                    child: Icon(
                      Icons.done,
                      color: blueColor,
                      size: 32,
                    ),
                  )
                ],
              ),
              body: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10.0, vertical: 10),
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      Center(
                        child: Container(
                          child: CircleAvatar(
                            backgroundImage: NetworkImage(imgTXT.text),
                          ),
                          width: 120,
                          height: 120,
                          decoration: BoxDecoration(
                            color: secondaryColor,
                            borderRadius: BorderRadius.circular(60),
                          ),
                        ),
                      ),
                      sizeVer(15),
                      Center(
                        child: Text(
                          "Đổi ảnh đại diện",
                          style: TextStyle(
                              color: blueColor,
                              fontSize: 20,
                              fontWeight: FontWeight.w400),
                        ),
                      ),
                      sizeVer(15),
                      ProfileFormWidget(
                        readonly: false,
                        title: "Tên",
                        controller: nameTXT,
                      ),
                      sizeVer(15),
                      ProfileFormWidget(
                        readonly: false,
                        title: "Giới tính",
                        controller: genderTXT,
                      ),
                      sizeVer(15),
                      ProfileFormWidget(
                        readonly: true,
                        title: "Ngày sinh",
                        controller: dobTXT,
                        onTap: _showDatePicker,
                      ),
                      sizeVer(15),
                      ProfileFormWidget(
                        readonly: false,
                        title: "Nội dung",
                        controller: contentTXT,
                      ),
                    ],
                  ),
                ),
              ),
            ),
          );
  }

  void _showDatePicker() {
    showDatePicker(
        context: context,
        initialDate: DateTime.now(),
        firstDate: DateTime(1900),
        lastDate: DateTime(3000));
  }
}
