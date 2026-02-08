
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pogo_username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    discord_username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Undisclosed',
    },
     level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,                    
    timestamps: true,             // Adds createdAt and updatedAt
    freezeTableName: true,        // 'User' not 'Users'
    underscored: true,            // Snake_case
    modelName: 'user',         // Model name in singular
  }
);

module.exports = User;