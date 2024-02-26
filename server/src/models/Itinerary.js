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
    defaultValue: 0,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    validate: {
      isUUID: 4,
    },
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: "New Itinerary",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  creationTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Itinerary.sync();

module.exports = Itinerary;
