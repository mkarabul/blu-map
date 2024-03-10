const { createClient } = require("redis");

const client = createClient();

client.on("error", (error) => {
  console.error("Error connecting to Redis:", error);
});

const set = (key, value) => {
  return new Promise((resolve, reject) => {
    client.set(key, value, (error, reply) => {
      if (error) {
        console.error("Error setting value in Redis:", error);
        reject(error);
      } else {
        console.log("Value set in Redis:", reply);
        resolve(reply);
      }
    });
  });
};

const get = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (error, reply) => {
      if (error) {
        console.error("Error getting value from Redis:", error);
        reject(error);
      } else {
        console.log("Value from Redis:", reply);
        resolve(reply);
      }
    });
  });
};

const quit = () => {
  client.quit();
};

module.exports = {
  set,
  get,
  quit,
};
