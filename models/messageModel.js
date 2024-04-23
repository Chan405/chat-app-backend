const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    chatId: String,
    sendId: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
