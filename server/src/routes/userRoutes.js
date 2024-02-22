const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("", (req, res) => {
  res.send("Hello World!");
});

router.post("", UserController.createUser);

module.exports = router;
