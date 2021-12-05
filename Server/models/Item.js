const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  sale: { type: Number, min: 0, max: 100, required: true },
  image: { type: String },
  stock: { type: Boolean, required: true },
});

const model = new mongoose.model("Items", schema);

module.exports.itemmodel = model;
module.exports.itemschema = schema;
