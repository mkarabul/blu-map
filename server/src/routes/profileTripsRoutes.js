const express = require("express");

const router = express.Router();

router.get("", (req, res) => {
  res.status(200).send(req.body);
});

router.post("", (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    res.status(200).send("Hi");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
