const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Recommendation = sequelize.define("Recommendation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Recommendation.sync();

module.exports = Recommendation;
