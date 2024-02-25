const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define("Post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  maker: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING), // for multiple images
    allowNull: true, // if the user doesnt want to put an image
  },
});

module.exports = Post;
