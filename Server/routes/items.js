const express = require("express");
const router = express.Router();
const { itemmodel } = require("../models/Item");
const validateItem = require("../itemFunctions");

router.post("/item", async (req, res) => {
  try {
    const result = await validateItem(req.body, itemmodel);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
