const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

///GET  /user/
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

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