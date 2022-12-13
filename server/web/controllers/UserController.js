const { User, Follow } = require("../models");
const sendToken = require("../utils/jwtToken.js");
const ErrorHandler = require("../utils/errorHandler.js");

exports.getAllUsers = async (req, res)=>{
  try {
    const users = await User.findAll();
    res.status(200).json({success:true, users});
  }catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
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

// Đăng nhập
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter the email & password", 400));
  }

  const user = await User.findOne({
    attributes: ["name", "id_user", "image", "password"],
    where: { email: req.body.email },
  });

  if (!user) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }
  const newUser = new User({
    id_user: user.id_user,
    name: user.name,
    image: user.image,
  });
  sendToken(newUser, 200, res);
};

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

// Chi tiết thông tin
exports.userDetails = async (req, res) => {
  const user = await User.findByPk(req.user.id_user);

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
      res.status(200).json({ like: true, msg: `Theo dõi thành công người dùng: ${id}` });
    } else {
      await Follow.destroy({ where: { id_fol: result.id_fol } });
      res.status(200).json({ like: false, msg: `Hủy theo dõi thành công người dùng: ${id}` });
    }
  } catch (error) {
    res.status(500).json({ error: { msg: "Lỗi chuyển đổi trạng thái" } });
  }
};