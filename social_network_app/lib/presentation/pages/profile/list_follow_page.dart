import 'package:flutter/material.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/widgets/search_widget.dart';

class ListFollowPage extends StatefulWidget {
  final int? user_id;
  final String? name;
  final int? initialIndex;

  const ListFollowPage(
      {Key? key, required this.user_id, this.name, required this.initialIndex})
      : super(key: key);

  @override
  State<ListFollowPage> createState() => _ListFollowPageState();
}

class _ListFollowPageState extends State<ListFollowPage> {
  bool isFollow = true;
  bool _loading = true;
  List<Follow> followers= [];
  List<Follow> followees = [];
  bool? isFollowed;
  bool? isSearch = false;
  TextEditingController text = TextEditingController();

  void searchFollower(String value) {
    setState(() {
      followers = followers
          .where((element) =>
              element.name!.toLowerCase().contains(value.toLowerCase()))
          .toList();
    });
  }

  Future<dynamic> _loadFollowers() async {
    ApiResponse response = await getFollowers(widget.user_id!);
    if (response.error == null) {
      setState(() {
        followers = response.data as List<Follow>;
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

  Future<dynamic> _loadFollowees() async {
    ApiResponse response = await getFollowees(widget.user_id!);
    if (response.error == null) {
      setState(() {
        followees = response.data as List<Follow>;
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
    _loadFollowers();
    _loadFollowees();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      initialIndex: widget.initialIndex!,
      length: 2,
      child: Scaffold(
        backgroundColor: backGroundColor,
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          title: Text(widget.name!),
          bottom: TabBar(
            tabs: [
              Tab(
                child: Text("Người theo dõi"),
              ),
              Tab(
                child: Text("Đang theo dõi"),
              )
            ],
          ),
        ),
        body: TabBarView(
          children: [
            if (_loading)
              Center(
                child: CircularProgressIndicator(),
              )
            else
              followers.isNotEmpty
                  ? CustomScrollView(
                      slivers: [
                        SliverList(
                            delegate:
                                SliverChildBuilderDelegate((context, index) {
                          return ListTile(
                              onTap: () => Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (context) => ProfilePage(
                                        user_id: followers[index].id_user,
                                        name: followers[index].name,
                                      ),
                                    ),
                                  ),
                              contentPadding: EdgeInsets.fromLTRB(0, 10, 0, 10),
                              hoverColor: Colors.grey,
                              dense: true,
                              title: Text(
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                followers[index].name!,
                                style: TextStyle(
                                    color: primaryColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18),
                              ),
                              leading: CircleAvatar(
                                backgroundColor: secondaryColor,
                                radius: 40,
                                backgroundImage:
                                    NetworkImage('${followers[index].image}'),
                              ),
                              trailing: Icon(
                                Icons.more_vert,
                                color: primaryColor,
                              ));
                        }, childCount: followers.length))
                      ],
                    )
                  : Center(
                      child: Container(
                      width: double.infinity,
                      height: 100,
                      child: Column(
                        children: [
                          Image.asset(
                            "assets/profile_default.png",
                            fit: BoxFit.cover,
                            height: 50,
                          ),
                          sizeVer(10),
                          Text(
                            "Không tìm thấy người dùng nào",
                            style:
                                TextStyle(fontSize: 18, color: Colors.white70),
                          )
                        ],
                      ),
                    )),
            if (_loading)
              Center(
                child: CircularProgressIndicator(),
              )
            else
              followees.isNotEmpty
                  ? CustomScrollView(
                      slivers: [
                        SliverList(
                            delegate:
                                SliverChildBuilderDelegate((context, index) {
                          return ListTile(
                              onTap: () => Navigator.of(context).push(
                                    MaterialPageRoute(
                                      builder: (context) => ProfilePage(
                                        user_id: followees[index].id_user,
                                        name: followees[index].name,
                                      ),
                                    ),
                                  ),
                              contentPadding: EdgeInsets.fromLTRB(0, 10, 0, 10),
                              title: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  SizedBox(
                                    width: MediaQuery.of(context).size.width *
                                        0.22,
                                    child: Text(
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      followees[index].name!,
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 15),
                                    ),
                                  ),
                                ],
                              ),
                              leading: CircleAvatar(
                                radius: 40,
                                backgroundColor: secondaryColor,
                                backgroundImage:
                                    NetworkImage(followees[index].image!),
                              ),
                              trailing: Icon(
                                Icons.more_vert,
                                color: primaryColor,
                              ));
                        }, childCount: followees.length))
                      ],
                    )
                  : Center(
                      child: Container(
                      width: double.infinity,
                      height: 100,
                      child: Column(
                        children: [
                          Image.asset(
                            "assets/profile_default.png",
                            fit: BoxFit.cover,
                            height: 50,
                          ),
                          sizeVer(10),
                          Text(
                            "Không tìm thấy người dùng nào",
                            style:
                                TextStyle(fontSize: 18, color: Colors.white70),
                          )
                        ],
                      ),
                    )),
          ],
        ),
      ),
    );
  }
}
