const express = require("express");
const userController = require("../controller/user");
const authController = require("../controller/auth");
const jwt = require("jsonwebtoken");

const userRouter = new express.Router();

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "Token Inexistente" });

  jwt.verify(token, "senhasecreta", function (err, decoded) {
    if (err)
      return res.status(500).json({ auth: false, message: "Token Inválido." });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.user._id;
    next();
  });
}

userRouter.post("/authenticate", authController.postAuth);
userRouter.post("/", userController.postUser);

userRouter.use(verifyJWT);

userRouter.get("/", userController.getUser);
userRouter.delete("/", userController.deleteUser);
userRouter.put("/", userController.putUser);
userRouter.put("/password", userController.putPasswordUser);

module.exports = userRouter;
