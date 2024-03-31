const Dislike = require("../models/Dislike");
const Like = require("../models/Like");

const DislikeController = {
  async createDislike(req, res) {
    try {
      const { postId, userId } = req.body;
      const existingDislike = await Dislike.findOne({
        where: { postId, userId },
      });

      const existingLike = await Like.findOne({
        where: { postId, userId },
      });

      if (existingLike) {
        await Like.destroy({
          where: { postId, userId },
        });
      }

      if (existingDislike) {
        await Dislike.destroy({
          where: { postId, userId },
        });
        return res.status(204).send();
      } else {
        const newDislike = await Dislike.create({ postId, userId });
        return res.status(201).json(newDislike);
      }
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
