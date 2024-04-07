const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProfilePicture = sequelize.define("ProfilePicture", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

ProfilePicture.sync({ alter: true });

module.exports = ProfilePicture;
