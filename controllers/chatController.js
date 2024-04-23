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
};
