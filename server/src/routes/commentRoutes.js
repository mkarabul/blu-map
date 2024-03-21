const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controllers/CommentController");

router.post("/comments", CommentController.createComment);

router.get("/comments", CommentController.fetchComments);

module.exports = router;
