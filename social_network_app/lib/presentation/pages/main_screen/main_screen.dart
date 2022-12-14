import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:social_network_app/data/models/user/user.dart';
import 'package:social_network_app/presentation/pages/activity/activity_page.dart';
import 'package:social_network_app/presentation/pages/post/upload_post_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';
import 'package:social_network_app/presentation/pages/search/search_page.dart';
import '../../../consts.dart';
import '../home/home_page.dart';
class MainScreen extends StatefulWidget {
  User? user;
  MainScreen({Key? key, this.user}) : super(key: key);
  @override
  State<MainScreen> createState() => _MainScreenState();
}
class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  late PageController pageController;
  @override
  void initState() {
    pageController = PageController();
    super.initState();
  }
  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }
  void navigationTapped(int index) {
    pageController.jumpToPage(index);
  }
  void onPageChanged(int index) {
    setState(() {
      _currentIndex = index;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: backGroundColor,
      bottomNavigationBar: CupertinoTabBar(
        backgroundColor: backGroundColor,
        items: [
          BottomNavigationBarItem(icon: Icon(MaterialCommunityIcons.home_variant, color: primaryColor), label: ""),
          BottomNavigationBarItem(icon: Icon(Ionicons.md_search, color: primaryColor), label: ""),
          BottomNavigationBarItem(icon: Icon(Ionicons.md_add_circle, color: primaryColor), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.favorite, color: primaryColor), label: ""),
          BottomNavigationBarItem(icon: CircleAvatar(radius:15,backgroundImage: NetworkImage(widget.user!.image!)), label: ""),
        ],
        onTap: navigationTapped,
      ),
      body: PageView(
        controller: pageController,
        children: [
          HomePage(),
          SearchPage(),
          UpLoadPostPage(),
          ActivityPage(),
          ProfilePage(name: widget.user!.name,user_id: widget.user!.id_user,)
        ],
        onPageChanged: onPageChanged,
      ),
    );
  }
}