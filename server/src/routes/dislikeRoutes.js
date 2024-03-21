const express = require("express");
const router = express.Router();
const DislikeController = require("../controllers/DislikeController");

// create a new dislike
router.post("/", DislikeController.createDislike);

// get all dislikes
router.get("/", DislikeController.getAllDislikes);

module.exports = router;
