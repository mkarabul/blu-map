const express = require("express");
const UserController = require("../controllers/UserController");

const router = express.Router();

router.get("/", UserController.getAllUsers);
router.get("/:username", UserController.getUserByUsername);
router.post("/", UserController.createUser);

module.exports = router;
