const { createClient } = require("redis");

const client = createClient();

client.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

client.connect().then(() => {
  console.log("Connected to Redis");
});

module.exports = client;
