import 'package:flutter/material.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/widgets/search_widget.dart';

class AllResult extends StatefulWidget {
  final List<User>? users;
  final TextEditingController? text;
  const AllResult({Key? key, this.text, this.users}) : super(key: key);

  @override
  State<AllResult> createState() => _AllResultState();
}

class _AllResultState extends State<AllResult> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        resizeToAvoidBottomInset: false,
        appBar: AppBar(
          backgroundColor: backGroundColor,
          title: SearchWidget(
            autoFocus: false,
            readOnLy: true,
            controller: widget.text!,
            onTap:() =>  Navigator.of(context).pop(),
          ),
        ),
        backgroundColor: backGroundColor,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10.0),
          child: CustomScrollView(
            slivers: [
              SliverList(delegate: SliverChildBuilderDelegate((context, index) {
                return ListTile(
                    contentPadding: EdgeInsets.fromLTRB(0, 5, 0, 5),
                    onTap: () =>
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) =>
                              ProfilePage(user_id: widget.users![index].id_user,name: widget.users![index].name),
                        )),
                    hoverColor: Colors.grey,
                    title: Text(
                      widget.users![index].name!,
                      style: TextStyle(
                          color: primaryColor,
                          fontWeight: FontWeight.bold,
                          fontSize: 18),
                    ),
                    subtitle: SizedBox(
                      width: 100,
                      child: Text(
                        widget.users![index].email!,
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
                        backgroundImage: NetworkImage(widget.users![index].image!),
                      ),
                    ),);
              },childCount: widget.users!.length))
            ],
          )
        ),
      ),
    );
  }
}
