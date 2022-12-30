const app = require("./app");
const db = require("./config/connection");
const connectDatabase = require("./config/mongodb");
const socket = require("socket.io");
const Chats = require("./models/mongo/chatModel");

const hostname = "192.168.2.121";
const PORT = process.env.PORT || 8000;

// Kết nối database
db.authenticate()
  .then(() => console.log("Kết nối DB thành công"))
  .catch((err) => console.log("Error: " + err));

connectDatabase();

// Tạo server
const server = app.listen(
  PORT,
  // hostname,
  // console.log(`Server running at http://${hostname}:${PORT}`)
  console.log(`Server running at: ${PORT}`)
);

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:8000",
    // credentials: true,
  },
});
const scanner = async (id) => {
  return (allGroupChat = await Chats.find({
    users: { $elemMatch: { $eq: id } },
  }).then((e) => e._id));
};

global._io = io;

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);

    for (const i of scanner()) {
      socket.join(i);
    }
    socket.emit("connected");
  });

  socket.on("join chat", (room, user) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // socket.on("new message", (newMessageRecieved) => {
  //   var chat = newMessageRecieved.chat;
  //   if (!chat.users) return console.log("chat.users not defined");
  //   chat.users.forEach((user) => {
  //     if (user._id == newMessageRecieved.sender._id) return;
  //     return socket.in(user._id).emit("message recieved", newMessageRecieved);
  //   });
  // });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
