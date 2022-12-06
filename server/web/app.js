const express = require("express"); //Thư viện tạo server
const app = express();
const bodyParser = require("body-parser"); // Chuyển đổi dữ liệu từ server sang object

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Danh sách các Route
const post = require("./routes/PostRoute").default;
app.use("/api", post);

module.exports = app;
