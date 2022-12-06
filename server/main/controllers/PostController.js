const Post = require("../models/post.js").default;

exports.getPost = async (req, res) => {
  const posts = await Post.findAll();

  res.status(200).json({
    success: true,
    posts,
  });
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.json({ newPost, success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};

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

exports.deletePost = async (req, res) => {
  try {
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({ success: true });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
};
