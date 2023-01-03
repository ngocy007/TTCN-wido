const { Photo, Post, Like_Post, User, Comment } = require("../models");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
// const cloudinary = require("../config/cloudinary");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Lấy dữ liệu tất cả bài viết
exports.getAllPost = async (req, res) => {
  const rawPosts = await Post.findAll({
    include: [
      { model: Photo, attributes: ["url"] },
      {
        model: User,
        attributes: ["name", "image", "id_user"],
      },
    ],
    order: [
      ['id_post', 'DESC'],
    ],
    limit: req.query._limit,
    offset: req.query._limit * req.query._page,
  });
  const processPosts = rawPosts.map((e) => e.get({ plain: true }));
  const posts = [];
  for (const post of processPosts) {
    let isLike = false;
    let countLike = 0;
    let like = await Like_Post.findOne({
      where: {
        [Op.and]: [{ id_post: post.id_post }, { id_user: req.user.id_user }],
      },
    });
    if (like) {
      isLike = true;
    }
    const { count } = await Like_Post.findAndCountAll({
      where: { id_post: post.id_post },
    });
    countLike = count;
    const countCmt = await Comment.findAll({
      where: { id_post: post.id_post },
    }).then((e) => e.length);
    posts.push({ ...post, isLike, countLike, countCmt });
  }

  res.status(200).json({
    success: true,
    posts,
  });
};

// Xem chi tiết bài viết
exports.getDetailsPost = async (req, res) => {
  const rawPosts = await Post.findOne({
    where: { id_post: req.params.id },
    include: [
      { model: Photo, attributes: ["url"] },
      { model: User, attributes: ["name", "image"] },
      {
        include: { model: User, attributes: ["name", "image", "id_user"] },
        model: Comment,
        attributes: ["id_com", "id_post", "content", "created_at"],
        separate: true,
        limit: 15,
        where: { reply: null },
        order: [
          ['id_com', 'DESC'],
        ],
      },
    ],
  });
  const processPosts = rawPosts.get({ plain: true });
  let isLike = false;
  let countLike = 0;
  let like = await Like_Post.findOne({
    where: {
      [Op.and]: [
        { id_post: processPosts.id_post },
        { id_user: req.user.id_user },
      ],
    },
  });
  if (like) {
    isLike = true;
  }
  const { count } = await Like_Post.findAndCountAll({
    where: { id_post: processPosts.id_post },
  });
  countLike = count;
  for (cmt of processPosts.Comments) {
    cmt.countRep = await Comment.findAll({
      where: {
        [Op.and]: [{ id_post: cmt.id_post }, { reply: cmt.id_com }],
      },
    }).then((e) => e.length);
  }
  const post = { ...processPosts, isLike, countLike };
  res.status(200).json({
    success: true,
    post,
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
    const result = await Like_Post.findOne({
      where: { id_user: userId, id_post: id },
    });

    if (!result) {
      await Like_Post.create({ id_user: userId, id_post: id });
      res.status(200).json({ like: true, msg: `Liked post: ${id}` });
    } else {
      await Like_Post.destroy({ where: { id_lp: result.id_lp } });
      res.status(200).json({ like: false, msg: `Disliked post: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: "Lỗi chuyển đổi trạng thái" } });
  }
};

// Lấy ra user like bài
exports.getUsersLP = async (req, res) => {
  try {
    const users = await Like_Post.findAll({
      attributes: [],
      where: { id_post: req.params.id },
      include: { model: User, attributes: ["name", "image", "id_user"] },
    });
    res.json({ users, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};
