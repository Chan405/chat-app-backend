const express = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = express.Router();

messageRouter.post("/", messageController.createMessage);
messageRouter.get("/:chatId", messageController.getMessages);

module.exports = messageRouter;
