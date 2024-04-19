const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vertification = sequelize.define("Vertification", {
    Id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            isInt: true,
        },
    },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Vertification.sync({ alter: true });

module.exports = Vertification;
