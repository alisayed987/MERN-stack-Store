const mongoose = require("mongoose");
const { userschema } = require("./User");
const { itemschema } = require("./Item");

const schema = new mongoose.Schema(
  {
    by: { type: userschema, require: true },
    order: { type: [itemschema], require: true },
    delivery_time: { type: Date },
  },
  { timestamps: true }
);

const model = new mongoose.model("Orders", schema);

module.exports = model;
