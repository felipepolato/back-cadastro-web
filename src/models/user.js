const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    id: { type: Number, unique: true },
    name: String,
    email: String,
    country: String,
    state: String,
    city: String,
    street: String,
    number: Number,
    cep: String,
    cpf: String,
    pis: String,
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
