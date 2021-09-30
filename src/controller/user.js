const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

///POST  /user/
module.exports.postUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      country,
      state,
      city,
      street,
      number,
      cep,
      cpf,
      pis,
      password,
    } = req.body;

    console.log(
      name,
      email,
      country,
      state,
      city,
      street,
      number,
      cep,
      cpf,
      pis,
      password
    );

    if (
      !name ||
      !email ||
      !country ||
      !state ||
      !city ||
      !street ||
      !number ||
      !cep ||
      !cpf ||
      !pis ||
      !password
    ) {
      throw new Error("Parâmetros Inexistentes!");
    }

    const newUser = {
      name,
      email,
      country,
      state,
      city,
      street,
      number,
      cep,
      cpf,
      pis,
      password,
    };

    const user = await User.create(newUser);

    return res.json(user);

    ///TODO Tratar Erro ////////
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

///DELETE  /user/
module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.userId
    User.findByIdAndDelete(userId)
    res.json("Usuario Deletado")
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
