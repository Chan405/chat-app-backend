const express = require("express");
const chatController = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter.post("/", chatController.createChatV2);
chatRouter.get("/:userId", chatController.getUserChats);
chatRouter.get("/find/:firstId/:secondId", chatController.getSingleChat);

module.exports = chatRouter;
