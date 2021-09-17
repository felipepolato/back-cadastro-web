const mongoose = require("mongoose");
require("../models/User");
const User = mongoose.model("User");

///GET  /products/
module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.json({ error });
  }
};

///POST  /products/
module.exports.postUser = async (req, res, next) => {
  try {
    const { name, email, country, state, county, street, number, cep, cpf, pis } =
      req.body;

    if (
      !name ||
      !email ||
      !country ||
      !state ||
      !county ||
      !street ||
      !number ||
      !cep ||
      !cpf ||
      !pis
    ) {
      throw new Error("Parâmetros Inexistentes!");
    }

    const newUser = {
      name,
      email,
      country,
      state,
      county,
      street,
      number,
      cep,
      cpf,
      pis,
    };

    const user = await User.create(newUser);
    return res.json(product);

    ///TODO Tratar Erro ////////
  } catch (error) {
    return res.json({ error });
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
