const Chats = require("../models/mongo/chatModel");
const Users = require("../models/mongo/userModel");

const chatCtrl = {
  CreateGroupChat: async (req, res, next) => {
    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }

    let users = req.body.users;
    if (users.length < 1) {
      return res
        .status(400)
        .send("More than 1 users are required to form a group chat");
    }

    users.push(req.currentUser);

    try {
      const groupChat = await Chats.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: users[0],
      });

      const fullGroupChat = await Chats.findOne({
        _id: groupChat._id,
      })
        .populate("users")
        .populate("groupAdmin");

      users.forEach((element) => {
        _io.in(element.email).emit("fetch");
      });
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  },

  getAllGroupChat: async (req, res, next) => {
    const allGroupChat = await Chats.find({
      users: { $elemMatch: { $eq: req.currentUser._id } },
    })
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    // _io.emit("fetch");
    res.status(200).json(allGroupChat);
  },

  RenameFromGroup: async (req, res, next) => {
    const { chatId, chatName } = req.body;
    console.log(chatId);
    const updatedChat = await Chats.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    );
    _io.in(updatedChat._id).emit("fetch");

    if (!updatedChat) {
      res.json({
        status: 400,
        success: false,
        msg: "Chat Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Updated Group Successfully !",
        updatedChat,
      });
    }
  },

  AddToGroup: async (req, res, next) => {
    //push them phan tu vao mang
    const { chatId, userId } = req.body;
    console.log(chatId, userId);

    // check if the requester is admin

    const added = await Chats.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      {
        new: true,
      }
    );
    _io.in(added._id).emit("fetch");
    if (!added) {
      res.json({
        status: 400,
        success: false,
        msg: "Chat Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        added,
      });
    }
  },
  RemoveFromGroup: async (req, res, next) => {
    //pull xoa phan tu khoi mang
    const { chatId, userId } = req.body;

    const removed = await Chats.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    );
    _io.in(removed._id).emit("fetch");
    if (!removed) {
      res.json({
        status: 400,
        success: false,
        msg: "Chat Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        success: true,
        removed,
      });
    }
  },
  accessChat: async (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }

    var isChat = await Chats.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.currentUser._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await Users.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.currentUser._id, userId],
      };

      try {
        const createdChat = await Chats.create(chatData);
        const FullChat = await Chats.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        console.log;
        res.status(400).json({
          msg: error.message,
        });
      }
    }
  },
  getAllUsers: async (req, res, next) => {
    try {
      const fullUser = await Users.find();

      res.status(200).json(fullUser);
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  },
};

module.exports = chatCtrl;
