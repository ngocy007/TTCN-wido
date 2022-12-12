const { Photo, Post, Like_Post, User } = require("../models");
const Like = require("../models/like_post.js");
const Sequelize = require("sequelize");

// Lấy dữ liệu tất cả bài viết
exports.getAllPost = async (req, res) => {
  const posts = await Post.findAll({
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("Like_Posts.id_lp")), "countLike"],
      ],
    },
    include: [
      {duplicating:false, model: Photo, attributes: ["url"] },
      {duplicating:false, model: User, attributes: ["name", "image"] },
      {
        duplicating:false,
        model: Like_Post,
        attributes: [],
      },
    ],
    group: ["Post.id_post", "Photos.id_photo", "User.id_user"],
    
    limit: 10,
    // offset: req.body.offset ?? 0,
  });

  res.status(200).json({
    success: true,
    posts,
  });
};

// Thêm bài viết
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      id_user: req.user.id_user,
    });

    for (let i = 0; i < req.newFile.length; i++) {
      await newPost.createPhoto({
        url: req.newFile[i],
        belong: "post",
      });
    }

    res.json({ newPost, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({ updatedPost, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id_post: req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

// Like bài
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_user;
    const result = await Like.findOne({
      where: { id_user: userId, id_post: id },
    });

    if (!result) {
      await Like_Post.create({ id_user: userId, id_post: id });
      res.status(200).json({ like: true, msg: `Liked post: ${id}` });
    } else {
      console.log(result.id_lp);
      await Like_Post.destroy({ where: { id_lp: result.id_lp } });
      res.status(200).json({ like: false, msg: `Disliked post: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: "Error in changing like status" } });
  }
};
