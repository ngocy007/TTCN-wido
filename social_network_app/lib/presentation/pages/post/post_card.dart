import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/models/user/api_respone.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/profile/profile_page.dart';

class PostCard extends StatefulWidget {
  const PostCard({Key? key, required this.post}) : super(key: key);
  final Post post;

  @override
  State<PostCard> createState() => _PostCardState();
}

class _PostCardState extends State<PostCard> {
  bool? _isLiked;
  int _current = 0;
  final CarouselController _controller = CarouselController();

  Future<dynamic> _LikePost(int id) async {
    ApiResponse response = await likePost(id);
    if (response.error == "") {
      setState(() {
        _isLiked = response.data as bool;
      });
    } else if (response.error == unauthorized) {
      logout().then((value) => {
            Navigator.of(context).pushAndRemoveUntil(
                MaterialPageRoute(
                  builder: (context) => SignInPage(),
                ),
                (route) => false)
          });
    } else {
      ScaffoldMessenger.of(context)
          .showSnackBar(SnackBar(content: Text('${response.error}')));
    }
  }

  @override
  void initState() {
    setState(() {
      _isLiked = widget.post.isLike;
    });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          GestureDetector(
            onTap: () => Navigator.of(context).push(MaterialPageRoute(
              builder: (context) => ProfilePage(
                user_id: widget.post.id_user,
                name: widget.post.user!.name,
              ),
            )),
            child: ListTile(
                dense: true,
                title: Text(
                  '${widget.post.user!.name}',
                  style: TextStyle(
                      color: primaryColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 15),
                ),
                leading: CircleAvatar(
                  backgroundColor: secondaryColor,
                  backgroundImage: NetworkImage('${widget.post.user!.image}'),
                ),
                trailing: Icon(
                  Icons.more_vert,
                  color: primaryColor,
                )),
          ),
          widget.post.photos!.length > 0
              ? CarouselSlider(
                  carouselController: _controller,
                  options: CarouselOptions(
                    height: MediaQuery.of(context).size.height * 0.6,
                    onPageChanged: (index, reason) {
                      setState(() {
                        _current = index;
                      });
                    },
                    viewportFraction: 1,
                    autoPlayAnimationDuration: Duration(seconds: 1),
                  ),
                  items: widget.post.photos!
                      .map(
                        (item) => item.url != ""
                            ? Image.network(
                                '${item.url}',
                                width: double.infinity,
                                fit: BoxFit.contain,
                              )
                            : Image.asset("assets/no-image-icon.png",
                                fit: BoxFit.cover),
                      )
                      .toList() as List<Widget>,
                )
              : Image.asset(
                  "assets/no-image-icon.png",
                  fit: BoxFit.cover,
                  height: MediaQuery.of(context).size.height * 0.6,
                ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: widget.post.photos!.asMap().entries.map((entry) {
              return GestureDetector(
                onTap: () => _controller.animateToPage(entry.key),
                child: Container(
                  width: 7.0,
                  height: 7.0,
                  margin: EdgeInsets.symmetric(vertical: 6, horizontal: 4.0),
                  decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: (Theme.of(context).brightness == Brightness.dark
                              ? Colors.white
                              : Colors.black)
                          .withOpacity(_current == entry.key ? 0.9 : 0.4)),
                ),
              );
            }).toList(),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(3, 0, 3, 3),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: _isLiked == false
                      ? IconButton(
                          onPressed: () => _LikePost(widget.post.id_post!),
                          icon: Icon(
                            Icons.favorite_outline,
                            size: 32,
                            color: primaryColor,
                          ))
                      : IconButton(
                          onPressed: () => _LikePost(widget.post.id_post!),
                          icon: Icon(
                            Icons.favorite_sharp,
                            size: 32,
                            color: Colors.pinkAccent,
                          )),
                ),
                Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: IconButton(
                      onPressed: () => {},
                      icon: Icon(
                        Feather.message_circle,
                        color: primaryColor,
                      )),
                ),
                IconButton(
                    onPressed: () => {},
                    icon: Icon(
                      Feather.send,
                      color: primaryColor,
                    )),
                Spacer(),
                IconButton(
                    onPressed: () => {},
                    icon: Icon(
                      Icons.bookmark_border,
                      color: primaryColor,
                    )),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                widget.post.countLike != 0
                    ? SizedBox(
                        child: Text(
                          '${widget.post.countLike} lượt thích',
                          style: TextStyle(
                              color: primaryColor,
                              fontSize: 15,
                              fontWeight: FontWeight.bold),
                        ),
                        height: 20,
                      )
                    : SizedBox(
                        height: 0,
                      ),
                widget.post.content != ""
                    ? RichText(
                        text: TextSpan(
                            text: '${widget.post.user!.name}',
                            style: TextStyle(
                                color: primaryColor,
                                fontWeight: FontWeight.bold),
                            children: [
                            TextSpan(
                              text: ' ${widget.post.content}',
                              style: TextStyle(
                                  fontWeight: FontWeight.normal,
                                  color: primaryColor),
                            )
                          ]))
                    : SizedBox(),
                SizedBox(
                  height: 5,
                ),
                widget.post.countCmt != 0
                    ? Text(
                        'Xem tất cả ${widget.post.countCmt} bình luận',
                        style: TextStyle(color: darkGreyColor),
                      )
                    : SizedBox(),
                SizedBox(
                  height: 5,
                ),
                Text(
                  'Đăng ngày',
                  style: TextStyle(fontSize: 13, color: darkGreyColor),
                ),
                SizedBox(
                  height: 5,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
