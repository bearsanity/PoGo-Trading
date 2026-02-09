
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class TradeOfferedPokemon extends Model {}

TradeOfferedPokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trade',
        key: 'id'
      },
    },
    pokemon_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pokemon',
        key: 'id'
      },
    },

  },
  {
    sequelize,                    
    timestamps: false,            // Disables createdAt and updatedAt, not relevant for this model as the actual model will know this
    freezeTableName: true,        // Uses 'Trade'
    underscored: true,            // Use snake_case
    modelName: 'tradeOfferedPokemon', // Model name in singular
  }
);

module.exports = TradeOfferedPokemon;