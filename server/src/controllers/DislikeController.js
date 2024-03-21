const Dislike = require("../models/Dislike");

const DislikeController = {
  async getAllDislikes(req, res) {
    try {
      const dislikes = await Dislike.findAll();
      res.status(200).json(dislikes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getDislike(req, res) {
    try {
      const { id } = req.params;
      const dislike = await Dislike.findOne({ where: { id: id } });

      if (!dislike) {
        res.status(404).json({ error: "Dislike not found" });
      } else {
        res.status(200).json(dislike);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUserDislikes(req, res) {
    try {
      const { userId } = req.params;

      if (req.user.sub !== userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const dislikes = await Dislike.findAll({
        where: { userId: userId },
      });
      res.status(200).json(dislikes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createDislike(req, res) {
    try {
      const dislike = await Dislike.create({
        userId: req.user.sub,
        ...req.body,
      });
      res.status(201).json(dislike);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteDislike(req, res) {
    try {
      const { id } = req.params;
      const dislike = await Dislike.findOne({ where: { id: id } });

      if (!dislike) {
        return res.status(404).json({ error: "Dislike not found" });
      }

      if (req.user.sub !== dislike.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const deleted = await Dislike.destroy({ where: { id: id } });
      if (deleted) {
        res.status(204).send({ message: "Dislike deleted" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = DislikeController;
