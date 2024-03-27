const express = require("express");
const router = express.Router();
const LikeController = require("../controllers/LikeController");

// create a new like
router.patch("/post/:postId", LikeController.createLike);

// get all likes
router.get("/post/:postId", LikeController.getLikeByPost);

module.exports = router;
