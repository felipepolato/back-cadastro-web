const mongoose = require("mongoose");
require("../models/user");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

///GET /user
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.userId,
    });

    res.json(user);
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

    const hash = await bcrypt.hash(password, 10);

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
      password: hash,
    };

    const user = await User.create(newUser);

    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/////PUT /user/password
module.exports.putPasswordUser = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;

    if (!password || !newPassword) {
      throw new Error("Parâmetro Inexitente!");
    }

    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      throw new Error("Token com usuário inexistente.");
    }

    const verifiedPassword = await bcrypt.compare(password, user.password);
    if (!verifiedPassword) {
      console.log("AQUIIII");
      throw new Error("Senha Incorreta!");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;
    await user.save();

    res.status(200).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

/////PUT /user/
module.exports.putUser = async (req, res, next) => {
  try {
    const { name, email, country, state, city, street, number, cep, cpf, pis } =
      req.body;

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
      !pis
    ) {
      throw new Error("Parâmetros Inexistentes!");
    }

    const user = await User.findOne({
      _id: req.userId,
    });

    if (!user) {
      throw new Error("Usuário Inválido.");
    }

    user.name = name;
    user.email = email;
    user.country = country;
    user.state = state;
    user.city = city;
    user.street = street;
    user.number = number;
    user.cep = cep;
    user.cpf = cpf;
    user.pis = pis;

    await user.save();

    res.status(200).send();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

///DELETE  /user/
module.exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    await User.findByIdAndDelete(userId);
    res.json("Usuario Deletado");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
