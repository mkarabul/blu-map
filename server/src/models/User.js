const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isSuspended: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  
});

User.sync({ alter: true });

module.exports = User;
