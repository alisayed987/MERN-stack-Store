const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String },
});

const model = new mongoose.model("User", schema);

module.exports.usermodel = model;
module.exports.userschema = schema;
