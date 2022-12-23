const express = require("express"); //Thư viện tạo server
const app = express();
const bodyParser = require("body-parser"); // Chuyển đổi dữ liệu từ server sang object
const cookieParser = require("cookie-parser");
const cors = require("cors");
const ErrorHandler = require("./middleware/error");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Danh sách các Route
const post = require("./routes/PostRoute");
const user = require("./routes/UserRoute");
const comment = require("./routes/CommentRoute");
const like = require("./routes/LikeRoute");


app.use("/api/post", post);
app.use("/api/user", user);
app.use("/api/comment", comment);
app.use("/api/like", like);

app.use(ErrorHandler);
module.exports = app;
