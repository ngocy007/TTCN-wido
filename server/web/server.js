const app = require("./app");
const db = require("./config/connection");
const cloudinary = require("cloudinary");
const cors = require("cors");

const hostname = "192.168.2.121";
const PORT = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Kết nối database
db.authenticate()
  .then(() => console.log("Kết nối DB thành công"))
  .catch((err) => console.log("Error: " + err));

// Tạo server

app.use(cors());
app.listen(
  PORT,
  // hostname,
  // console.log(`Server running at http://${hostname}:${PORT}`)
  console.log(`Server running at: ${PORT}`)
);
