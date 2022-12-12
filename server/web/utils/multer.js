const multer = require("multer");

// Cấu hình nơi lưu trữ 
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, '../uploads/')
  },
  filename: (req, file, cb)=>{
    cb(null, Date().now() + '-' + file.originalname) 
  }
})

// Xác thực file tải lên
const fileFilter = (req,file,cb)=>{
  if(!file.originalname.match(/\.(jpg|JPG|png|PNG|jpeg|JPEG|gif|GIF|mp4)$/)){
    req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
})

module.exports = upload;