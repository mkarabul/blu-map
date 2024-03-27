const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Dislike = sequelize.define("Dislike", {
  postId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Dislike.sync();

module.exports = Dislike;
