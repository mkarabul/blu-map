const express = require("express");
const router = express.Router();

const VertificationController = require("../controllers/VertificationController");

router.get("/verify/:userEmail", VertificationController.sendVerificationEmail);

module.exports = router;
