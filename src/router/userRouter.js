const express = require("express");
const userController = require("../controller/user");

const userRouter = new express.Router();

userRouter.post("/", userController.postUser);
userRouter.get("/", userController.gettUser);

module.exports = userRouter