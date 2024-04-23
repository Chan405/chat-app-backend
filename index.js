const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectMogodb = require("./utils/database");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
const app = express();

connectMogodb();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

app.use("*", (request, response) => {
  response.json({ message: "No route found" });
});

app.listen(1500, console.log("server start"));
