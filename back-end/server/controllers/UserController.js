const { User, Follow, Post, Photo } = require("../models");
const sendToken = require("../utils/jwtToken.js");
const ErrorHandler = require("../utils/errorHandler.js");
const { Op } = require("sequelize");
const redis = require("../config/redis");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const sendOTP = require("../utils/sendOTP");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Đăng ký
exports.createUser = async (req, res) => {
  try {
    let user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản đã tồn tại" });
    }

    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  try {
    let newImage;
    if (req.newAva) {
      newImage = req.newAva;
    }

    const newData = {
      name: req.body.name,
      gender: req.body.gender,
      content: req.body.content,
      dob: req.body.dob,
      image: newImage,
    };
    const user = await User.update(newData, {
      where: { id_user: req.user.id_user },
    });
    res.json({ user, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Đăng nhập
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Vui lòng nhập email và mật khẩu", 400));
  }

  const user = await User.findOne({
    attributes: ["name", "id_user", "image", "password"],
    where: { email: req.body.email },
  });

  if (!user) {
    return next(new ErrorHandler("Không tìm thấy người dùng với email", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Mật khẩu không đúng", 401));
  }
  const newUser = new User({
    id_user: user.id_user,
    name: user.name,
    image: user.image,
  });
  sendToken(newUser, 200, res);
});

// Đăng xuất
exports.logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Đã đăng xuất",
  });
};

// Chi tiết thông tin cá nhân
exports.userDetails = async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: { model: Post,attributes:["id_post"],include:{model: Photo,limit:1} } });
  res.status(200).json({
    success: true,
    user,
  });
};

exports.myDetails = async (req, res) => {
  const user = await User.findByPk(req.user.id_user, {
    include: { model: Post },
  });
  res.status(200).json({
    success: true,
    user,
  });
};

// Theo dõi
exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_user;
    const result = await Follow.findOne({
      where: { id_followee: userId, id_follower: id },
    });

    if (!result) {
      await Follow.create({ id_followee: userId, id_follower: id });
      res
        .status(200)
        .json({ like: true, msg: `Theo dõi thành công người dùng: ${id}` });
    } else {
      await Follow.destroy({ where: { id_fol: result.id_fol } });
      res.status(200).json({
        like: false,
        msg: `Hủy theo dõi thành công người dùng: ${id}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: "Lỗi chuyển đổi trạng thái" } });
  }
};

// Kiểm tra người theo dõi
exports.checkFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id_user;
    const result = await Follow.findOne({
      where: { id_followee: userId, id_follower: id },
    });
    if (result) {
      res.status(200).json({ status: true });
    } else {
      res.status(200).json({ status: false });
    }
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Lấy ra tất cả người đang theo dõi mình
exports.getUsersFLr = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Follow.findAll({
      where: { id_follower: id },
      include: {
        as: "follower",
        model: User,
        attributes: ["name", "image", "id_user"],
      },
      order: [["id_fol", "DESC"]],
      attributes: [],
    });
    res.json({ users, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Lấy ra tất cả người mình đang theo dõi
exports.getUsersFLg = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Follow.findAll({
      where: { id_followee: id },
      include: {
        as: "followee",
        model: User,
        attributes: ["name", "image", "id_user"],
      },
      order: [["id_fol", "DESC"]],
      attributes: [],
    });
    res.json({ users, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Tìm kiếm
exports.searchUser = async (req, res) => {
  try {
    const { q } = req.params;
    const users = await User.findAll({
      where: {
        name: {
          [Op.like]: `%${q.toLowerCase()}%`,
        },
      },
      attributes: ["name", "image", "id_user"],
    });
    res.json({ users, success: true });
  } catch (error) {
    res.sendStatus(500).send(err);
  }
};

// Gửi OTP
exports.sendOTPCreate = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      return next(
        new ErrorHandler(`Email ${req.body.email} đã được sử dụng`, 404)
      );
    } else {
      sendOTP(email, res);
    }
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

exports.sendOTPForgotPW = catchAsyncErrors(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return next(
        new ErrorHandler(
          `Không tìm thấy người dùng với email ${req.body.email}`,
          404
        )
      );
    } else {
      sendOTP(email, res);
    }
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// Xác thực OTP
exports.isOTP = catchAsyncErrors((req, res, next) => {
  const { email, otp } = req.body;

  redis.get(email, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result == otp) {
        res.send({ success: true });
      } else {
        return next(
          new ErrorHandler(
            `OTP sai vui lòng nhập lại`,
            404
          )
        );
      }
    }
  });
});  

// Đặt lại mật khẩu
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    where: { id_user: req.user.id_user },
  });
  user.password = req.body.password;
  await user.save();
  res.send({ success: true, message: "Đổi mặt khẩu thành công" });
});

// Quên mật khẩu
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user) {
    return next(
      new ErrorHandler(
        `Không tìm thấy người dùng với email${req.body.email}`,
        404
      )
    );
  }

  await user.update({
    password: req.body.password,
  });
  res.send({ success: true });
});