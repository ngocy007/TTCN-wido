const { User, Follow, Comment, Post, Photo } = require("../models");
const userMon = require("../models/mongo/userModel");
const messs = require("../models/mongo/messageModel");
const { Op } = require("sequelize");

exports.statistic = async (req, res) => {
  try {
    const start =
      typeof req.body.start === "undefined"
        ? new Date(2001, 7, 11)
        : req.body.start;

    const end = typeof req.body.end === "undefined" ? new Date() : req.body.end;

    const sum_user = await User.findAll({
      where: {
        createdAt: { [Op.between]: [start, end] },
      },
    }).then((e) => e.length);

    const sum_post = await Post.findAll({
      where: {
        createdAt: { [Op.between]: [start, end] },
      },
    }).then((e) => e.length);

    const sum_comment = await Comment.findAll({
      where: {
        createdAt: { [Op.between]: [start, end] },
      },
    }).then((e) => e.length);

    const sum_mess = await messs.find().then((e) => e.length);

    const statistic = {
      sum_user: sum_user,
      sum_post: sum_post,
      sum_comment: sum_comment,
      sum_mess: sum_mess,
    };

    res.status(200).json({ statistic, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.grantPermission = async (req, res) => {
  try {
    const { id } = req.params;

    if (id == req.user.id_user) {
      return res.status(401).json({
        success: false,
        message: "khong duoc tu suong",
      });
    }

    const user = await User.findOne({
      where: {
        id_user: id,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not find",
      });
    }

    user.role = user.role == 2 ? 1 : 2;
    user.save();

    res.json({ user, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (req.user.id_user == id) {
      return res.status(500).json({
        success: false,
        message: "k duoc xoa ban than",
      });
    }

    const user = await User.findOne({
      where: {
        id_user: id,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user not find",
      });
    }
    console.log(user.email);

    await userMon.deleteOne({ email: user.email });

    user.destroy();
    user.save();

    res.json({ user, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
