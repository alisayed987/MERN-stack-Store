const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbdebug = require("debug")("app:db");
const startupdebug = require("debug")("app:startup");
const Auth = require("./routes/Auth");
const item = require("./routes/items");

mongoose
  .connect("mongodb://localhost:27017/store")
  .then(() => {
    dbdebug("connected");
  })
  .catch((err) => {
    dbdebug("couldn't connect due too : ", err);
  });

app.use(express.json());
app.use("/auth", Auth);
app.use("/", item);

app.listen(5000, () => {
  startupdebug("working on 5000");
});
