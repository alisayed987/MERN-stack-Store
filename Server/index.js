const express = require("express");
const app = express();
const Auth = require("./routes/Auth");
const mongoose = require("mongoose");
const dbdebug = require("debug")("app:db");
const startupdebug = require("debug")("app:startup");

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

app.listen(5000, () => {
  startupdebug("working on 5000");
});
