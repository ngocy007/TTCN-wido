const app = require("./app");
const db = require("./config/connection");

app.get("/", (req, res) => res.send("Xin chào"));

const PORT = process.env.PORT || 5000;

// Kết nối database
db.authenticate()
  .then(() => console.log("Kết nối DB thành công"))
  .catch((err) => console.log("Error: " + err));


// Tạo server
app.listen(PORT, console.log(`Server chạy trên cổng ${PORT}`));
