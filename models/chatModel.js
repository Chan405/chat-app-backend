const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
  {
    members: Array,
    groupName: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
