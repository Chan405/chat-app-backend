const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const upload = require("../utils/upload");

userRouter.post("/", upload.single("img"), userController.handleRegister);
userRouter.post("/login", userController.handleLogin);
userRouter.get("/", userController.getUsers);
userRouter.get("/:userId", userController.getUserInfo);

module.exports = userRouter;
