const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: Number, min: 0, require: true },
  sale: { type: Number, min: 0, max: 100, require: true },
  image: { type: String },
  stock: { type: Boolean, require: true },
});

const model = new mongoose.model("Items", schema);

module.exports.itemmodel = model;
module.exports.itemschema = schema;
