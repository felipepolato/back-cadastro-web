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
    return res.json({ error });
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
    console.log(error);
    return res.status(400).json({ error });
  }
};

//POST /authenticate
module.exports.postAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.findOne({
      email,
    }).select("+passowrd");

    if (!newUser) {
      throw new Error("Usuário não encontrado!");
    }

    if (!(await bcrypt.compare(password, newUser.password))) {
      throw new Error("Senha invalida!");
    }

    const user = await User.create(newUser);

    return res.json(user);

    ///TODO Tratar Erro ////////
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};

///PUT  /products/
// module.exports.putUser = async (req, res, next) => {
//   try {
//     const { id, qty } = req.body;
//     if (!id || !qty) {
//       throw new Error("Parâmetros Inexistentes!");
//     }

//     const product = await Product.findOne({
//       id,
//     });

//     const hasStock = product.qty_stock - qty >= 0;
//     if (!hasStock) {
//       throw new Error("Estoque Indisponível!");
//     }

//     const update = {
//       qty_stock: product.qty_stock - qty,
//     };

//     const updated = await Product.findOneAndUpdate(
//       {
//         id: id,
//       },
//       update,
//       {
//         new: true,
//       }
//     );
//     return res.json(updated);
//     ///TODO Tratar Erro ////////
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//}
