const redis = require("../config/redis");
const sendMail = require("./sendMail");

const sendOTP = async (email,res) => {
  const otp = Math.floor(Math.random() * (999999 - 100000) + 100000);
  const message = `Mã OTP của bạn: ${otp}`;
  let send = false;
  redis
    .get(email, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        if (result == null) {
          redis.set(email, otp, "EX", 120);
          send = true;
        }
      }
      return send;
    })
    .then(() => {
      if (send == true) {
        sendMail({
          email: email,
          subject: `Xác thực đăng ký`,
          message,
        });
        res.send({ message: "Đã gửi email, vui lòng kiểm tra" });
      } else {
        res.send({ message: "Vui lòng đợi 2 phút" });
      }
    });
};

module.exports = sendOTP;