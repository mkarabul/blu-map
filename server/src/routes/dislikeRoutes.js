const express = require("express");
const router = express.Router();
const DislikeController = require("../controllers/DislikeController");

// create a new dislike
router.patch("/post/:postId", DislikeController.createDislike);

// get all dislikes
router.get("/post/:postId", DislikeController.getDislikeByPost);

module.exports = router;
