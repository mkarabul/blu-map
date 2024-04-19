const Itinerary = require("../models/Itinerary");

const ItineraryController = {
  async getAllItineraries(req, res) {
    try {
      const itineraries = await Itinerary.findAll();
      res.status(200).json(itineraries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getItinerary(req, res) {
    try {
      const { id } = req.params;
      const itinerary = await Itinerary.findOne({ where: { uuid: id } });

      if (!itinerary) {
        res.status(404).json({ error: "Itinerary not found" });
      }
      // Check if the user is authorized to view this itinerary
      if (req.user.sub !== itinerary.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      res.status(200).json(itinerary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getUserItineraries(req, res) {
    try {
      const { userId } = req.params;

      if (req.user.sub !== userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const itineraries = await Itinerary.findAll({
        where: { userId: userId },
      });
      res.status(200).json(itineraries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createItinerary(req, res) {
    try {
      const itinerary = await Itinerary.create({
        userId: req.user.sub,
        ...req.body,
      });
      res.status(201).json(itinerary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateItinerary(req, res) {
    try {
      const { id } = req.params;
      const itinerary = await Itinerary.findOne({ where: { uuid: id } });

      // Check if the itinerary exists
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      // Check if the user is authorized to update this itinerary
      if (req.user.sub !== itinerary.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const [updated] = await Itinerary.update(req.body, {
        where: { uuid: id },
      });

      const updatedItinerary = await Itinerary.findOne({ where: { uuid: id } });
      res.status(200).json(updatedItinerary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteItinerary(req, res) {
    try {
      const { id } = req.params;
      const itinerary = await Itinerary.findOne({ where: { uuid: id } });

      // Check if the itinerary exists
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      // Check if the user is authorized to delete this itinerary
      if (req.user.sub !== itinerary.userId) {
        return res.status(403).json({ error: "User not authorized" });
      }

      const deleted = await Itinerary.destroy({ where: { uuid: id } });
      if (deleted) {
        res.status(204).send({ message: "Itinerary deleted" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async copyItinerary(req, res) {
    try {
      const { id } = req.params;
      const itinerary = await Itinerary.findOne({ where: { uuid: id } });

      // Check if the itinerary exists
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }

      const newItineraryObject = {
        userId: req.user.sub,
        ...itinerary.dataValues,
      };

      delete newItineraryObject.uuid;
      delete newItineraryObject.id;

      const newItinerary = await Itinerary.create(newItineraryObject);

      res.status(201).json(newItinerary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

module.exports = ItineraryController;
