// Import the models - different files so requires 5 imports
const User = require('./User');
const Trade = require('./Trade');
const Pokemon = require('./Pokemon');
const TradeWantedPokemon = require('./TradeWantedPokemon');
const TradeOfferedPokemon = require('./TradeOfferedPokemon');
const sequelize = require('../config/connection');

//================================== Associations ==================================

User.hasMany(Trade);
Trade.belongsTo(User);

// Using the wanted/offered models as junction tables to connect the trades to offers/asks
// Wanted/asks
Trade.belongsToMany(Pokemon, { through: TradeWantedPokemon, as: 'wantedPokemon' });
Pokemon.belongsToMany(Trade, { through: TradeWantedPokemon, as: 'tradesWantingThis' });

// Offered
Trade.belongsToMany(Pokemon, { through: TradeOfferedPokemon, as: 'offeredPokemon' });
Pokemon.belongsToMany(Trade, { through: TradeOfferedPokemon, as: 'tradesOfferingThis' });

// Have to export them all again so the other files can see the associations
module.exports = { User, Trade, Pokemon, TradeWantedPokemon, TradeOfferedPokemon, sequelize };