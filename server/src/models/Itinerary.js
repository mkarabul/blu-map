const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Itinerary = sequelize.define("Itinerary", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    validate: {
      isInt: true,
    },
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    validate: {
      isUUID: 4,
    },
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "New Itinerary",
  },
  activities: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
});

Itinerary.sync();

module.exports = Itinerary;
