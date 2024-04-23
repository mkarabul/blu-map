const { GetPublicAccessBlockCommand } = require("@aws-sdk/client-s3");
const client = require("../config/googleMapsClient");
const cache = require("../config/cache");

const PlacesController = {
  getPlaces: async (req, res) => {
    try {
      const { location, narrow } = req.query;

      if (!location) {
        return res.status(400).json({ error: "Location is required" });
      }

      const type = narrow === "" ? "tourist_attraction" : narrow;

      let response = await cache.get(`place:${location}:${type}`);
      if (response) {
        return res.status(200).json(JSON.parse(response));
      }

      const request = {
        params: {
          location,
          type,
          radius: 5000,
          rankby: "prominence",
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      };

      response = await client.placesNearby(request);

      console.log(
        location,
        narrow,
        response.data.results.map((r) => r.name)
      );

      await cache.set(
        `place:${location}:${type}`,
        JSON.stringify(response.data.results)
      );

      return res.status(200).json(response.data.results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getCity: async (req, res) => {
    const { latitude, longitude } = req.body;
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    // Define shifts in various directions
    const adjustments = [
      { latShift: 0.1, lngShift: 0 }, // North
      { latShift: -0.1, lngShift: 0 }, // South
      { latShift: 0, lngShift: 0.1 }, // East
      { latShift: 0, lngShift: -0.1 }, // West
    ];

    // Helper to construct URL
    const constructUrl = (lat, lng) =>
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    // Collect all fetch Promises
    const fetchPromises = adjustments.map((adj) => {
      const adjLat = latitude + adj.latShift;
      const adjLng = longitude + adj.lngShift;
      return fetch(constructUrl(adjLat, adjLng)).then((resp) => resp.json());
    });

    // Add original location fetch to the promises
    fetchPromises.unshift(
      fetch(constructUrl(latitude, longitude)).then((resp) => resp.json())
    );

    Promise.all(fetchPromises)
      .then((results) => {
        const cities = new Set(); // Use a Set to avoid duplicate city names

        results.forEach((data) => {
          if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const cityObj = addressComponents.find((component) =>
              component.types.includes("locality")
            );
            if (cityObj && cityObj.long_name) {
              cities.add(cityObj.long_name.trim()); // Trim to remove any extra whitespace
            }
          }
        });

        if (cities.size > 0) {
          res.json({ cities: Array.from(cities) }); // Convert Set to Array and return as JSON
        } else {
          res.status(404).json({ error: "No cities found" });
        }
      })
      .catch((error) => {
        console.error("Error accessing Google Geocoding API", error);
        res.status(500).json({ error: "Failed to fetch cities" });
      });
  },
};

module.exports = PlacesController;
