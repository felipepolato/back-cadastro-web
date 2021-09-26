const express = require("express");
const userController = require("../controller/user");

const userRouter = new express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/", userController.postUser);
userRouter.post("/authenticate", userController.postAuth);

module.exports = userRouter;
