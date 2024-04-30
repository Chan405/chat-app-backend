// create chat

const chatModel = require("../models/chatModel");

const createChat = async (request, response) => {
  const { firstId, secondId } = request.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return response.status(200).json(chat);

    const newChat = new chatModel({ members: [firstId, secondId] });

    const res = await newChat.save();

    return response.status(201).json(res);
  } catch (e) {
    return response.status(500).json({ message: "Unknown Error" });
  }
};

const createChatV2 = async (request, response) => {
  const { firstId, secondId, members, groupName } = request.body;

  try {
    // Check if it's an individual chat or a group chat
    if (groupName) {
      // Group chat
      const existingGroupChat = await chatModel.findOne({
        members: { $all: members },
      });

      if (existingGroupChat) {
        return response.status(400).json({ message: "Group chat already exists with the same members" });
      }

      const newGroupChat = new chatModel({ members, groupName });
      const savedGroupChat = await newGroupChat.save();
      return response.status(201).json(savedGroupChat);
    } else {
      // Individual chat
      // const existingChat = await chatModel.findOne({
      //   members: { $all: [firstId, secondId] },
      // });

      // if (existingChat?.members?.length === 2) {
      //   return response.status(200).json({existingChat, message: "Chat already exists"});
      // }

      const newChat = new chatModel({ members: [firstId, secondId] });
      const savedChat = await newChat.save();
      return response.status(201).json(savedChat);
    }
  } catch (error) {
    console.error("Error creating chat:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};


const getUserChats = async (request, response) => {
  const userId = request.params.userId;

  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });

    return response.status(200).json(chats);
  } catch (e) {
    return response.status(500).json({ message: "Unknown Error" });
  }
};

const getSingleChat = async (request, response) => {
  try {
    const { firstId, secondId } = request.params;
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    return response.status(201).json(chat);
  } catch (e) {
    return response.status(500).json({ message: "Unknown Error" });
  }
};

module.exports = {
  createChat,
  getUserChats,
  getSingleChat,
  createChatV2
};
