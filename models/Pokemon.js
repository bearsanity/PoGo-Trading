
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
  {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pokedex_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sprite_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    generation: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type2: {
        type: DataTypes.STRING,
        allowNull: true,  // Not all pokemon have 2 types
    },
  },
  {
    sequelize,                    
    timestamps: false,             // Disables createdAt and updatedAt, not relevant for this model
    freezeTableName: true,        // Uses 'Pokemon' not 'Pokemons'
    underscored: true,            // Use snake_case (snake_case instead of camelCase)
    modelName: 'pokemon',         // Model name in singular
  }
);

module.exports = Pokemon;