const Messages = require("../models/mongo/messageModel");
const Users = require("../models/mongo/userModel");
const Chats = require("../models/mongo/chatModel");

const MessageCtrl = {
  AllMessages: async (req, res, next) => {
    try {
      const messages = await Messages.find({
        chat: req.params.chatId,
      }).populate("sender", "name pic email");
      // .populate("chat");
      res.json(messages);
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  },

  SendMessage: async (req, res, next) => {
    const { content, chatId, time, date } = req.body;
    console.log(content);
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.json({ status: 400, msg: "Invalid data passed into request" });
    }
    var newMessage = {
      sender: req.currentUser._id,
      content: content,
      chat: chatId,
      time,
      date,
    };
    try {
      var message = await Messages.create(newMessage);
      message = await message.populate("sender", "name pic");

      // message = await message.populate("chat");
      // message = await Users.populate(message, {
      //   path: "chat.users",
      //   select: "name pic email",
      // });

      await Chats.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });
      _io.in(req.body.chatId).emit("new message", message);

      res.json(message);
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  },
};

module.exports = MessageCtrl;
