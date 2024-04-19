const { Client } = require("@googlemaps/google-maps-services-js");


const client = new Client();

const run = async () => {
  const location = [48.8566, 2.3522];

  const request = {
    params: {
      location,
      type: "tourist_attraction",
      radius: 5000,
      rankby: "prominence",
      key: "AIzaSyAeh_xZxxQnlm0LxCeFSBQSj2QZo2iuNAc",
    },
  };

  const response = await client.placesNearby(request);

  console.log(response.data);
};

run();
