const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Preference = sequelize.define("Preference", {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activityPreferences: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  locationPreferences: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  interestPreferences: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  currentLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plannedTripLocation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  plannedTripActivities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

Preference.sync({ alter: true });

module.exports = Preference;
