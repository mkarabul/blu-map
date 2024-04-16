const express = require("express");
const {
  checkJwt,
  getUserInfoMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();
const CommentController = require("../controllers/CommentController");

router.post("/post/:postId", CommentController.createComment);

router.get("/post/:postId", CommentController.getCommentsByPost);

router.delete(
  "/:uuid",
  checkJwt,
  getUserInfoMiddleware,
  CommentController.deleteComment
);

//get comment count for user
router.get("/commentcount/:userId", CommentController.getUserCommentCount);

module.exports = router;
