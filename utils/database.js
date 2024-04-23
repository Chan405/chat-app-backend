const mongoose = require("mongoose");

const connectMogodb = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected");
  } catch (e) {
    console.log({ e });
  }
};

module.exports = connectMogodb;
