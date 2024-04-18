const { GetPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
const client = require("../config/googleMapsClient");

const PlacesController = {
  getPlaces: async (req, res) => {
    try {
      const { location } = req.query;
      const request = {
        params: {
          location,
          type: "tourist_attraction",
          radius: 5000,
          rankby: "prominence",
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      };

      const response = await client.placesNearby(request);
      res.status(200).json(response.data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = PlacesController;
