import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/post/upload_post_page.dart';
import 'package:social_network_app/presentation/pages/profile/list_follow_page.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/post/detail_post_page.dart';
import 'package:social_network_app/presentation/pages/profile/edit_profile_page.dart';

class ProfilePage extends StatefulWidget {
  int? user_id;
  String? name;

  ProfilePage({Key? key, this.user_id, this.name}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  bool _loading = true;
  User user = User();
  bool isUser = false;
  bool? isFollowed;
  int fol = 0;

  Future<dynamic> _follow(int id) async {
    int uid = await getUserId();
    ApiResponse response = await follow(id,uid);

    if (response.error == null) {
      setState(() {
        isFollowed = response.data as bool;
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

  Future<dynamic> _logout() async {
    setState(() {
      _loading = true;
    });
    ApiResponse response = await logoutUser();
    if (response.error == null) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => SignInPage(),
          ),
          (route) => false));
    } else if (response.error == unauthorized) {
      logout().then((value) => Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(
            builder: (context) => SignInPage(),
          ),
          (route) => false));
    } else {
      setState(() {
        _loading = false;
      });
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  Future<dynamic> _getUser() async {
    int myId = await getUserId();
    ApiResponse response = await getUserDetail(widget.user_id);
    if (response.error == null) {
      if (myId == widget.user_id) {
        setState(() {
          isUser = true;
          user = response.data as User;
          fol = user.countFollower!;
          _loading = false;
        });
      } else {
        ApiResponse response2 = await checkFollow(widget.user_id!);
        setState(() {
          isFollowed = response2.data as bool;
          user = response.data as User;
          fol = user.countFollower!;
          _loading = false;
        });
      }
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
    return Scaffold(
        backgroundColor: backGroundColor,
        appBar: AppBar(
          backgroundColor: backGroundColor,
          title: Text(
            "${widget.name}",
            style: TextStyle(color: primaryColor),
          ),
          actions: [
            isUser == true ? Padding(
              padding: const EdgeInsets.only(right: 10.0),
              child: InkWell(
                  onTap: () {
                    _openBottomModalSheet(context);
                  },
                  child: Icon(
                    Icons.menu,
                    color: primaryColor,
                  )),
            ): SizedBox()
          ],
        ),
        body: _loading
            ? Center(
                child: CircularProgressIndicator(),
              )
            : RefreshIndicator(
                onRefresh: () {
                  setState(() {
                    _loading = true;
                  });
                  return _getUser();
                },
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 15.0, vertical: 10),
                  child: SingleChildScrollView(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              margin: EdgeInsets.only(left: 10),
                              child: CircleAvatar(
                                backgroundImage: NetworkImage(user.image!),
                              ),
                              width: 80,
                              height: 80,
                              decoration: BoxDecoration(
                                  color: secondaryColor,
                                  shape: BoxShape.circle),
                            ),
                            Row(
                              children: [
                                Column(
                                  children: [
                                    Text(
                                      user.posts!.length.toString(),
                                      style: TextStyle(
                                          color: primaryColor,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18),
                                    ),
                                    sizeVer(8),
                                    Text(
                                      "Bài viết",
                                      style: TextStyle(
                                          color: primaryColor, fontSize: 15),
                                    )
                                  ],
                                ),
                                sizeHor(20),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                      padding: EdgeInsets.all(0),
                                      backgroundColor: Colors.transparent),
                                  onPressed: () => Navigator.of(context).push(
                                      MaterialPageRoute(
                                          builder: (context) => ListFollowPage(
                                              user_id: user.id_user,
                                              name: user.name,
                                              initialIndex: 0))),
                                  child: Column(
                                    children: [
                                      Text(
                                        "$fol",
                                        style: TextStyle(
                                            color: primaryColor,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 18),
                                      ),
                                      sizeVer(8),
                                      SizedBox(
                                        width:
                                            MediaQuery.of(context).size.width *
                                                0.22,
                                        child: Text(
                                          overflow: TextOverflow.ellipsis,
                                          "Người theo dõi",
                                          style: TextStyle(
                                              color: primaryColor,
                                              fontSize: 15),
                                          maxLines: 1,
                                        ),
                                      )
                                    ],
                                  ),
                                ),
                                sizeHor(5),
                                ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                      padding: EdgeInsets.all(0),
                                      backgroundColor: Colors.transparent),
                                  onPressed: () => Navigator.of(context).push(
                                      MaterialPageRoute(
                                          builder: (context) => ListFollowPage(
                                              user_id: user.id_user,
                                              name: user.name,
                                              initialIndex: 1))),
                                  child: Column(
                                    children: [
                                      Text(
                                        "${user.countFollowee}",
                                        style: TextStyle(
                                            color: primaryColor,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 18),
                                      ),
                                      sizeVer(8),
                                      SizedBox(
                                        width:
                                            MediaQuery.of(context).size.width *
                                                0.22,
                                        child: Text(
                                          overflow: TextOverflow.ellipsis,
                                          "Đang theo dõi",
                                          style: TextStyle(
                                              color: primaryColor,
                                              fontSize: 15),
                                          maxLines: 1,
                                        ),
                                      )
                                    ],
                                  ),
                                )
                              ],
                            )
                          ],
                        ),
                        sizeVer(10),
                        SizedBox(
                          width: 100,
                          child: Text(
                            "${user.email?.replaceAll("@gmail.com", "")}",
                            style: TextStyle(
                                fontSize: 16,
                                color: primaryColor,
                                fontWeight: FontWeight.bold),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        isUser == false
                            ? SizedBox(
                                width: MediaQuery.of(context).size.width * 0.85,
                                child: Column(
                                  children: [
                                    sizeVer(10),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        SizedBox(
                                          width: 160,
                                          height: 30,
                                          child: isFollowed == true
                                              ? ElevatedButton(
                                                  onPressed: () async {
                                                    await _follow(
                                                        user.id_user!);
                                                    setState(() {
                                                      fol = fol - 1;
                                                    });
                                                  },
                                                  child: Row(
                                                    mainAxisAlignment:
                                                        MainAxisAlignment
                                                            .center,
                                                    children: [
                                                      Text("Đang theo dõi",
                                                          style: TextStyle(
                                                              fontSize: 15)),
                                                      Icon(Icons.expand_more)
                                                    ],
                                                  ),
                                                  style:
                                                      ElevatedButton.styleFrom(
                                                    backgroundColor:
                                                        Colors.white24,
                                                    padding:
                                                        EdgeInsets.only(top: 2),
                                                  ),
                                                )
                                              : ElevatedButton(
                                                  onPressed: () async {
                                                    await _follow(
                                                        user.id_user!);
                                                    setState(() {
                                                      fol = fol + 1;
                                                    });
                                                  },
                                                  child: Text("Theo dõi",
                                                      maxLines: 1,
                                                      overflow:
                                                          TextOverflow.ellipsis,
                                                      style: TextStyle(
                                                          fontSize: 15)),
                                                  style:
                                                      ElevatedButton.styleFrom(
                                                    padding:
                                                        EdgeInsets.only(top: 2),
                                                  ),
                                                ),
                                        ),
                                        SizedBox(
                                          width: 160,
                                          height: 30,
                                          child: ElevatedButton(
                                            onPressed: () {},
                                            child: Text("Nhắn tin",
                                                style: TextStyle(fontSize: 15)),
                                            style: ElevatedButton.styleFrom(
                                              padding: EdgeInsets.only(top: 2),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              )
                            : const SizedBox(),
                        isUser == true ?Column(
                          children: [
                            sizeVer(5),
                            Center(
                              child: ElevatedButton(
                                  style: ElevatedButton.styleFrom(
                                      backgroundColor: Color(0xFF4F4D4D)),
                                  onPressed: () {
                                    Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                            builder: (context) =>
                                                EditProfilePage()));
                                  },
                                  child: Text("Chỉnh sửa thông tin cá nhân")),
                            ),
                          ],
                        ):SizedBox(),
                        sizeVer(10),
                        user.posts!.isEmpty && isUser == true
                            ? Center(
                                child: Padding(
                                  padding: EdgeInsets.only(top: MediaQuery.of(context).size.height * 0.2),
                                  child: Column(
                                  children: [
                                    Text("Hãy đăng bài viết đầu tiên"),
                                    ElevatedButton(
                                        onPressed: () => Navigator.of(context)
                                                .push(MaterialPageRoute(
                                              builder: (context) =>
                                                  UpLoadPostPage(),
                                            )),
                                        child: Text("Tạo bài viết"))
                                  ],
                              ),
                                ))
                            : GridView.builder(
                                itemCount: user.posts?.length,
                                physics: ScrollPhysics(),
                                shrinkWrap: true,
                                gridDelegate:
                                    SliverGridDelegateWithFixedCrossAxisCount(
                                        crossAxisCount: 3,
                                        crossAxisSpacing: 5,
                                        mainAxisSpacing: 5),
                                itemBuilder: (context, index) {
                                  return GestureDetector(
                                    onTap: () async {
                                      bool delete = await Navigator.of(context)
                                          .push(MaterialPageRoute(
                                        builder: (context) => DetailPost(
                                          name: widget.name!,
                                          image: user.image!,
                                          post: user.posts![index],
                                        ),
                                      ));
                                      delete == true
                                          ? setState(() {
                                              user.posts!.removeAt(index);
                                            })
                                          : null;
                                    },
                                    child: Container(
                                      width: 100,
                                      height: 100,
                                      child:
                                          user.posts![index].photos!.isNotEmpty
                                              ? Image.network(
                                                  user.posts![index].photos!
                                                      .first.url!,
                                                  fit: BoxFit.cover,
                                                )
                                              : Image.asset(
                                                  "assets/no-image-icon.png"),
                                    ),
                                  );
                                })
                      ],
                    ),
                  ),
                ),
              ));
  }

  _openBottomModalSheet(BuildContext context) {
    return showModalBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            height: 150,
            decoration: BoxDecoration(color: backGroundColor.withOpacity(.8)),
            child: SingleChildScrollView(
              child: Container(
                margin: EdgeInsets.symmetric(vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child: Text(
                        "Chức năng",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 18,
                            color: primaryColor),
                      ),
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    Divider(
                      thickness: 1,
                      color: secondaryColor,
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child: GestureDetector(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => EditProfilePage()));
                        },
                        child: Text(
                          "Chỉnh sửa thông tin",
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 16,
                              color: primaryColor),
                        ),
                      ),
                    ),
                    sizeVer(7),
                    Divider(
                      thickness: 1,
                      color: secondaryColor,
                    ),
                    sizeVer(7),
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child: GestureDetector(
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("Thông báo?"),
                              content: Text("Bạn muốn đăng xuất"),
                              actions: [
                                TextButton(
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                    },
                                    child: Text("Hủy",
                                        style: TextStyle(color: Colors.white))),
                                TextButton(
                                    onPressed: () {
                                      Navigator.of(context).pop();
                                      _logout();
                                    },
                                    child: Text(
                                      "OK",
                                      style: TextStyle(color: Colors.white),
                                    )),
                              ],
                            ),
                          );
                        },
                        child: Text(
                          "Đăng xuất",
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 16,
                              color: primaryColor),
                        ),
                      ),
                    ),
                    sizeVer(7),
                  ],
                ),
              ),
            ),
          );
        });
  }
}
