const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/LikeController");

// create a new like
router.post("/", LikeController.createLike);

// get all likes
router.get("/", LikeController.getAllLikes);

module.exports = router;
