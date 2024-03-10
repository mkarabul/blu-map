const { createClient } = require("redis");

const client = createClient({
    url: process.env.REDIS_URL,
});

client.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

client.connect().then(() => {
  console.log("Connected to Redis");
});

module.exports = client;
