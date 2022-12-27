"use strict";

var multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, path.join(__dirname, "/uploads/"));
  },
  filename: function filename(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    cb({
      message: "Unsupported file format"
    }, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024
  },
  fileFilter: fileFilter
});
module.exports = upload;