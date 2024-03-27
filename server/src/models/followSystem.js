const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const followSystem = sequelize.define("followSystem", {

  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  followingUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

followSystem.sync();

module.exports = followSystem;
