import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
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

  int? _default;
  var optionList = [ 'Nữ', 'Nam'];

  DateTime _dateTime = DateTime.now();
  User? user;
  bool _loading = true;
  bool _loading2 = false;

  Future<dynamic> _updateUser() async{

    ApiResponse response = await updateUser(contentTXT.text, dobTXT.text, _default!, nameTXT.text);
    if (response.error == null) {
      setState(() {
        _loading2 = false;
      });
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('Thay đổi thông tin thành công',),duration: Duration(seconds: 3),));
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => const SignInPage(),
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
        nameTXT.text = user!.name ?? "";
        _default = user!.gender;
        dobTXT.text = user!.dob!;
        contentTXT.text = user!.content ?? "";
        imgTXT.text = user!.image ?? "";
        _loading = false;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => const SignInPage(),
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
        ? const Center(
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
                title: const Text("Chỉnh sửa thông tin"),
                leading: GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: const Icon(
                      Icons.close,
                      size: 32,
                    )),
                actions: [
                  Padding(
                    padding: const EdgeInsets.only(right: 10.0),
                    child: _loading2 == true ? Center(child: CircularProgressIndicator(),) : IconButton(
                      onPressed: () {
                        FocusManager.instance.primaryFocus?.unfocus();
                        setState(() {
                          _loading2 = true;
                          _verifyName() ? _updateUser() : _loading2 = false;
                        });
                      },
                      icon: const Icon(
                        Icons.done,
                        color: blueColor,
                        size: 32,
                      ),
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
                      const Center(
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const Text("Giới tính:",style: TextStyle(fontSize: 16),),
                          sizeHor(10),
                          DropdownButton(
                            value: _default,
                            items: <DropdownMenuItem<int>>[
                              DropdownMenuItem(
                                value: 0,
                                child: Text('Nữ',style: TextStyle(fontSize: 17),),
                              ),
                              DropdownMenuItem(
                                value: 1,
                                child: Text('Nam',style: TextStyle(fontSize: 17),),
                              ),
                            ],
                            onChanged: (int? value) {
                              setState(() {
                                _default = value!;
                              });
                            },
                          ),
                        ],
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
        initialEntryMode: DatePickerEntryMode.calendarOnly,
        context: context,
        initialDate: _dateTime,
        firstDate: DateTime(1900),
        lastDate: DateTime(3000)).then((value) {
          setState(() {
            dobTXT.text = DateFormat('dd-MM-yyyy').format(value!);
          });
    });
  }

  bool _verifyName() {
    if (nameTXT.text.trim().length > 50) {
      ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text("Tên chỉ được nhập tối đa 50 ký tự")));
      return false;
    } else {
      return true;
    }
  }
}
