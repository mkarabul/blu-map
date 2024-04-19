const Comment = require("../models/Comment");
const User = require("../models/User");

const CommentController = {
  async createComment(req, res) {
    try {
      const { postId, comment, userId } = req.body;
      const user = await User.findByPk(userId);
      const { userName } = user;

      const newComment = await Comment.create({
        postId,
        comment,
        userId,
        userName,
      });
      res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getCommentsByPost(req, res) {
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
  async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll();
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteComment(req, res) {
    try {
      const { uuid } = req.params;
      const comment = await Comment.findByPk(uuid);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
      await comment.destroy();
      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getUserCommentCount(req, res) {
    try {
      const { userId } = req.params;
      const comments = await Comment.findAll({
        where: { userId },
      });
      res.json({ totalComments: comments.length });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = CommentController;
