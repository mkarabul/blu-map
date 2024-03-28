const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const followRequest = sequelize.define("followRequest", {

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  followingUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

followRequest.sync({ alter: true });

module.exports = followRequest;
