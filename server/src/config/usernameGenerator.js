const {
  uniqueNamesGenerator,
  adjectives,
  starWars,
  NumberDictionary,
} = require("unique-names-generator");

const numberDictionary = NumberDictionary.generate({ length: 3 });

const config = {
  dictionaries: [adjectives, starWars, numberDictionary],
  style: "capital",
};

const generate = () =>
  uniqueNamesGenerator(config).replaceAll(" ", "").replaceAll("_", "");

module.exports = generate;
