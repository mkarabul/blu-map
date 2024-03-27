const Dislike = require("../models/Dislike");

const DislikeController = {
  async createDislike(req, res) {
    try {
      const { postId, userId } = req.body;
      const newDislike = await Dislike.create({
        postId,
        userId,
      });
      res.status(201).json(newDislike);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  async getDislikeByPost(req, res) {
    try {
      const { postId } = req.params;
      const dislikes = await Dislike.findAll({
        where: { postId },
      });
      res.json(dislikes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = DislikeController;
