const { Comment, User, Like_Comment, Post } = require("../models");

// Lấy bình luận
exports.getMoreComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { id_post: req.params.id },
      include: [
        { duplicating: false, model: User, attributes: ["name", "image"] },
      ],
      offset: req.body.offset ?? 15,
      limit: 10,
    });
    res.json({ comments, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};
// Tạo bình luận
exports.commentCreate = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      id_post: req.body.id_post,
      id_user: req.user.id_user,
    });
    res.json({ comment, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Xóa bình luận
exports.commentDelete = async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id_com: req.params.id,
      },
    });
    if (comment) {
      res.json({ success: true });
    } else {
      res.json({
        message: `không tìm thấy comment với id ${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllPost = async (req, res) => {
  const posts = await Post.findAll({
    attributes: {
      include: [
        [Sequelize.fn("COUNT", Sequelize.col("Like_Posts.id_lp")), "countLike"],
      ],
    },
    include: [
      { duplicating: false, model: Photo, attributes: ["url"] },
      { duplicating: false, model: User, attributes: ["name", "image"] },
      {
        duplicating: false,
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

// Like bình luận
exports.likeComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_user;
    const result = await Like_Comment.findOne({
      where: { id_user: userId, id_com: id },
    });
    if (!result) {
      await Like_Comment.create({ id_user: userId, id_com: id });
      res.status(200).json({ like: true, msg: `Liked comment: ${id}` });
    } else {
      await Like_Comment.destroy({ where: { id_lc: result.id_lc } });
      res.status(200).json({ like: false, msg: `Disliked comment: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: "Lỗi chuyển đổi trạng thái" } });
  }
};

// Lấy ra user bình luận
exports.getUsersLCM = async (req, res) => {
  try {
    const users = await Comment.findOne({
      attributes: [],
      where: { id_com: req.params.id },
      include: { model: User, attributes: ["name", "image", "id_user"] },
    });
    res.json({ users, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};
