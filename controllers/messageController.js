const messageModel = require("../models/messageModel");

const createMessage = async (request, response) => {
  const { chatId, sendId, text } = request.body;
  const message = new messageModel({ chatId, sendId, text });

  try {
    const res = await message.save();

    response.status(200).json(res);
  } catch (e) {
    return response.status(500).json({ message: "Unknown Error" });
  }
};

const getMessages = async (request, response) => {
  const { chatId } = request.params;

  try {
    const messages = await messageModel.find({ chatId });
    response.status(200).json(messages);
  } catch (e) {
    return response.status(500).json({ message: "Unknown Error" });
  }
};

module.exports = { createMessage, getMessages };
