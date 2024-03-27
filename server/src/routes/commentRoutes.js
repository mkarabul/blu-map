const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

router.post("/post/:postId", CommentController.createComment);

router.get("/post/:postId", CommentController.getCommentsByPost);

module.exports = router;
