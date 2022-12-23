const app = require("./app");
const db = require("./config/connection");

const hostname = "192.168.2.121";
const PORT = process.env.PORT || 8000;

// Kết nối database
db.authenticate()
  .then(() => console.log("Kết nối DB thành công"))
  .catch((err) => console.log("Error: " + err));

// Tạo server
app.listen(
  PORT,
  // hostname,
  // console.log(`Server running at http://${hostname}:${PORT}`)
  console.log(`Server running at: ${PORT}`)
);


