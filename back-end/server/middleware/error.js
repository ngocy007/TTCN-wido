const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Lỗi server"

    // wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Không có kết quả nào cho id này ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
  

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
      }

     // Wrong Jwt error
     if (err.name === "JsonWebTokenError") {
     const message = `Truy cập không có, vui lòng thử lại`;
     err = new ErrorHandler(message, 400);
     }

      //Jwt expired error
      if (err.name === "TokenExpiredError") {
        const message = `Truy cập đã hết hạn, vui lòng đăng nhập lại`;
        err = new ErrorHandler(message, 400);
        }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

