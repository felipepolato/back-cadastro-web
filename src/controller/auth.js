const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//POST /authenticate
module.exports.postAuth = async (req, res, next) => {
  try {
    const { email, password, cpf } = req.body;

    if (!email || !password || !cpf) {
      throw new Error("Parâmetro Inexistente!");
    }

    const query = {
      cpf: cpf,
    };

    if (email.includes("@")) {
      query.email = email;
    } else query.pis = email;

    const user = await User.findOne(query).lean();

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Senha invalida!");
    }

    const responseUser = {
      ...user,
    };

    delete responseUser.password;

    const token = jwt.sign({ user: responseUser }, "senhasecreta", {
      subject: user._id.toString(),
      expiresIn: "1d",
    });

    return res.json({ token, user: responseUser });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
