const { GetPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
const client = require("../config/googleMapsClient");
const cache = require("../config/cache");

const PlacesController = {
  getPlaces: async (req, res) => {
    try {
      const { location } = req.query;

      if (!location) {
        return res.status(400).json({ error: "Location is required" });
      }

      let response = await cache.get(`place:${location}`);
      if (response) {
        return res.status(200).json(JSON.parse(response));
      }

      const request = {
        params: {
          location,
          type: "tourist_attraction",
          radius: 5000,
          rankby: "prominence",
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      };

      response = await client.placesNearby(request);

      await cache.set(
        `place:${location}`,
        JSON.stringify(response.data.results)
      );

      return res.status(200).json(response.data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = PlacesController;
