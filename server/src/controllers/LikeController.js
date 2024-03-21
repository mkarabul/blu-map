const Like = require("../models/Like");

const LikeController = {
  async getAllLikes(req, res) {
    try {
      const likes = await Like.findAll();
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getLike(req, res) {
    try {
      const { id } = req.params;
      const like = await Like.findOne({ where: { id: id } });

      if (!like) {
        res.status(404).json({ error: "Like not found" });
      } else {
        res.status(200).json(like);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUserLikes(req, res) {
    try {
      const { userId } = req.params;

      if (req.user.sub !== userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const likes = await Like.findAll({
        where: { userId: userId },
      });
      res.status(200).json(likes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createLike(req, res) {
    try {
      const like = await Like.create({
        userId: req.user.sub,
        ...req.body,
      });
      res.status(201).json(like);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteLike(req, res) {
    try {
      const { id } = req.params;
      const like = await Like.findOne({ where: { id: id } });

      if (!like) {
        return res.status(404).json({ error: "Like not found" });
      }

      if (req.user.sub !== like.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const deleted = await Like.destroy({ where: { id: id } });
      if (deleted) {
        res.status(204).send({ message: "Like deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = LikeController;
