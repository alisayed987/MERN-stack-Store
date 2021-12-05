const express = require("express");
const router = express.Router();
const { usermodel } = require("../models/User");
const registerebug = require("debug")("app:register");
const logindebug = require("debug")("app:login");
const {
  validateRegisteredUser,
  validateUser,
  createUser,
} = require("../userFunctions");
const _ = require("lodash");

//----Login---------------------------------------------------------------
router.post("/login", async (req, res) => {
  logindebug(req.body);
  try {
    const logged = await validateUser(req.body, usermodel);
    res.status(200).header("access-token", logged).send("Logged in");
  } catch (error) {
    res.send(error.message);
  }
});

//----Register------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const createuser = await validateRegisteredUser(req.body, usermodel);
    if ((createuser, usermodel)) {
      const result = await createUser(req.body);
      res.send(_.pick(result, ["_id", "name", "email"]));
    } else {
      res.status(403).send("User Already Exists");
    }
  } catch (error) {
    registerebug(error); //
    res.send(error);
  }
});

module.exports = router;
