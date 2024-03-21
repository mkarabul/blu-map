const Comment = require("../models/Comment");

const CommentController = {
  async createComment(req, res) {
    try {
      const { postId, text } = req.body;
      const newComment = await Comment.create({
        postId,
        text,
      });
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async fetchComments(req, res) {
    try {
      const { postId } = req.params;
      const comments = await Comment.findAll({
        where: { postId },
      });
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = CommentController;
