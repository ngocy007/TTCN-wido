const { Comment, User, Like_Comment } = require("../models");

// Tạo bình luận
exports.commentCreate = async (req, res) => {
  try {
    if (req.body.reply) {
      const isSameID = await Comment.findOne({
        where: {
          id_com: req.body.reply,
        },
      }).then((e) => e.id_post);

      if (isSameID != req.body.id_post) {
        return res.status(401).json({
          mess: "khong ton tai comment do trong post",
        });
      }
    }
    const comment = await Comment.create({
      reply: req.body.reply,
      content: req.body.content,
      id_post: req.body.id_post,
      id_user: req.user.id_user,
    });
    const User = {
      id_user: req.user.id_user,
      image: req.user.image,
      name: req.user.name,
    };
    res.json({ comment, User, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy thêm bình luận
exports.getMoreComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { id_post: req.params.id },
      include: [
        { duplicating: false, model: User, attributes: ["name", "image"] },
      ],
      offset: req.body.offset ?? 15,
      limit: 10,
      where: { reply: null },
    });
    res.json({ comments, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Lấy trả lời bình luận
exports.getReplyCom = async (req, res) => {
  try {
    const replies = await Comment.findAll({
      where: { reply: req.params.id },
      include: { model: User, attributes: ["name", "image", "id_user"] },
      order: [["id_com", "DESC"]],
      limit: 10,
      offset: req.body.more ?? 0,
    });
    res.json({ success: true, replies });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Xóa bình luận
exports.commentDelete = async (req, res) => {
  console.log("aa");
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
