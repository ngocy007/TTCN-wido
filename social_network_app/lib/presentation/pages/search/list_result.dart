import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/pages/search/all_result.dart';
import 'package:social_network_app/presentation/widgets/search_widget.dart';

class ListResult extends StatefulWidget {
  const ListResult({Key? key}) : super(key: key);

  @override
  State<ListResult> createState() => _ListResultState();
}

class _ListResultState extends State<ListResult> {
  final TextEditingController text = TextEditingController();
  List<User> users = [];

  Future<dynamic> _searchUser(String q) async {
    ApiResponse response = await searchUser(q,);
    if (response.error == null) {
      setState(() {
        users = response.data as List<User>;
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
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusManager.instance.primaryFocus?.unfocus();
      },
      child: SafeArea(
        child: Scaffold(
          resizeToAvoidBottomInset: false,
          appBar: AppBar(
            backgroundColor: backGroundColor,
            title: SearchWidget(
              autoFocus: true,
              readOnLy: false,
              onChanged: (value) {
                if(text.text.trim().isNotEmpty){
                  _searchUser(value);
                }
                if(text.text.isEmpty){
                  setState(() {
                    users.clear();
                  });
                }

              },
              controller: text,
            ),
          ),
          backgroundColor: backGroundColor,
          body: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Divider(
                  color: secondaryColor,
                ),
                ListView.builder(
                    itemCount: users.length > 5 ? 5 : users.length,
                    shrinkWrap: true,
                    itemBuilder: (context, index) {
                      return ListTile(
                          contentPadding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                          onTap: () =>
                              Navigator.of(context).push(MaterialPageRoute(
                                builder: (context) =>
                                    ProfilePage(user_id: users[index].id_user,name: users[index].name),
                              )),
                          hoverColor: Colors.grey,
                          title: Text(
                            users[index].name!,
                            style: TextStyle(
                                color: primaryColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 18),
                          ),
                          subtitle: SizedBox(
                            width: 100,
                            child: Text(
                              users[index].email!,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style:
                                  TextStyle(color: secondaryColor, fontSize: 14),
                            ),
                          ),
                          leading: Container(
                            width: 40,
                            height: 40,
                            child: CircleAvatar(
                              backgroundColor: secondaryColor,
                              backgroundImage: NetworkImage(users[index].image!),
                            ),
                          ));
                    }),
                SizedBox(
                  width: MediaQuery.of(context).size.width,
                  height: 60,
                  child: TextButton(
                      onPressed: () =>
                          users.length > 0 ? Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => AllResult(
                              text: text,
                              users: users,
                            ),
                          )) : null,
                      child: Text("Xem tất cả kết quả")),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
