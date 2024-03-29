const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Friend = sequelize.define("Friend", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  friendUserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  friendId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isPending: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Friend.sync({ alter: true });

module.exports = Friend;
