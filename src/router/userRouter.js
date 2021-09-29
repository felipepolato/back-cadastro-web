const express = require("express");
const userController = require("../controller/user");
const authController = require("../controller/auth");

const userRouter = new express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/", userController.postUser);
userRouter.post("/authenticate", authController.postAuth);

module.exports = userRouter;
