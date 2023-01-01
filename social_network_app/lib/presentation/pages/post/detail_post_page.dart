import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_icons/flutter_icons.dart';
import 'package:social_network_app/config/constant.dart';
import 'package:social_network_app/consts.dart';
import 'package:social_network_app/data/models/api/api_respone.dart';
import 'package:social_network_app/data/models/post/post.dart';
import 'package:social_network_app/data/service/post_service.dart';
import 'package:social_network_app/data/service/user_service.dart';
import 'package:social_network_app/presentation/pages/credentail/sign_in_page.dart';
import 'package:social_network_app/presentation/pages/post/comment_page.dart';


class DetailPost extends StatefulWidget {
  final Post post;
  final String name;
  final String image;
  const DetailPost({Key? key, required this.post, required this.name, required this.image}) : super(key: key);

  @override
  State<DetailPost> createState() => _DetailPostState();
}

class _DetailPostState extends State<DetailPost> {
  bool _loading = true;
  bool? _isLiked;
  int _current = 0;
  final CarouselController _controller = CarouselController();
  Post post = Post();
  int? myId;

  Future<dynamic> _deletePost(int id) async {
    setState(() {
      _loading = true;
    });

    ApiResponse response = await deletePost(id);
    if (response.error == null)  {
        setState(() {
          Navigator.pop(context,true);
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

  Future<dynamic> _LikePost(int id) async {
    ApiResponse response = await likePost(id);
    if (response.error == null) {
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

  Future<dynamic> _getDetailt(int id) async {
    myId = await getUserId();
    ApiResponse response = await getDetail(id);
    if (response.error == null) {
      setState(() {
        post = response.data as Post;
        _isLiked = post.isLike;
        _loading = false;
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
    _getDetailt(widget.post.id_post!);
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: backGroundColor,
        appBar: AppBar(
          backgroundColor: backGroundColor,
          title: Text(
            "Bài viết",
            style: TextStyle(color: primaryColor),
          ),
        ),
      body: _loading ? Center(child: CircularProgressIndicator(),) : detailPost()
    );
  }
  detailPost(){
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ListTile(
            dense: true,
            title: Text(
              widget.name,
              style: TextStyle(
                  color: primaryColor,
                  fontWeight: FontWeight.bold,
                  fontSize: 15),
            ),
            leading: CircleAvatar(
              backgroundColor: secondaryColor,
              backgroundImage: NetworkImage(widget.image),
            ),
            trailing: GestureDetector(
              onTap: myId == post.id_user ? (){
                _openBottomModalSheet(context);
              } : null,
              child: Icon(
                Icons.more_vert,
                color: primaryColor,
              ),
            )),
        post.photos!.length > 0
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
          items: post.photos!
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
              .toList(),
        )
            : Image.asset(
          "assets/no-image-icon.png",
          fit: BoxFit.cover,
          height: MediaQuery.of(context).size.height * 0.6,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: post.photos!.asMap().entries.map((entry) {
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
                    onPressed: () => Navigator.of(context).push(MaterialPageRoute(
                      builder: (context) => CommentPage(
                        post: post,avatar: widget.image,),
                    )),
                    icon: Icon(
                      Feather.message_circle,
                      color: primaryColor,
                    )),
              ),
              IconButton(
                  onPressed: () {},
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
              post.countCmt != 0
                  ? Text(
                'Xem tất cả ${post.comments?.length} bình luận',
                style: TextStyle(color: darkGreyColor),
              )
                  : SizedBox(),
              SizedBox(
                height: 5,
              ),
              Text(
                'Đăng lúc ${cvDate(post.createdAt)}',
                style: TextStyle(fontSize: 13, color: darkGreyColor),
              ),
              SizedBox(
                height: 5,
              ),
            ],
          ),
        )
      ],
    );
  }

  _openBottomModalSheet(BuildContext context) {
    return showModalBottomSheet(
        context: context,
        builder: (context) {
          return Container(
            height: MediaQuery.of(context).size.height*1/8,
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
                    Divider(
                      thickness: 1,
                      color: secondaryColor,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 10.0),
                      child: GestureDetector(
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertDialog(
                              title: Text("Thông báo?"),
                              content: Text("Bạn muốn xóa bài viết"),
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
                                      Navigator.of(context).pop();
                                      _deletePost(widget.post.id_post!);
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
                          "Xóa",
                          style: TextStyle(
                              fontWeight: FontWeight.w500,
                              fontSize: 16,
                              color: primaryColor),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        });
  }
}



