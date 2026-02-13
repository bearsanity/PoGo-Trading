//Have to move wanted/offered to their own tables to allow for clean listings with multiple asks/offers
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trade extends Model {}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'user',  // Links to User table
        key: 'id'
        }
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'No notes'
    },
    mirror: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  },
  {
    sequelize,                    
    timestamps: true,             // Enables createdAt and updatedAt
    freezeTableName: true,        // Uses 'Trade' not 'Trades'
    underscored: true,            // Use snake_case
    modelName: 'trade',           // Model name in singular
  }
);

module.exports = Trade;