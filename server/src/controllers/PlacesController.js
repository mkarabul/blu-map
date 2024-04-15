import { request } from "express";
import client from "../config/googleMapsClient";

const PlacesController = {
  requestNearbyPlaces: async (req, res) => {
    try {
      const { location } = req.query;
      const request = {
        params: {
          location,
        },
      };

      const response = await client.placesNearby(request);
      res.status(200).json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = PlacesController;
