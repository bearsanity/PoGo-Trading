const router = require('express').Router();
const { Pokemon, User, Trade, TradeWantedPokemon, TradeOfferedPokemon  } = require('../models');

router.get('/', async (req, res) =>{
    try {
        const tradeData = await Trade.findAll({
        limit: 4,
        order: [['created_at', 'DESC']],
        include: [
            { model: User },
            { model: Pokemon, as: 'wantedPokemon' },
            { model: Pokemon, as: 'offeredPokemon' }
        ]
    });
        const trades = tradeData.map(trade => trade.get({ plain: true }));
        res.render('home', { trades });

    } catch(err) {
    res.status(500).json(err);
    }
});

router.get('/create-trade', async (req, res) => {
  const pokemonData = await Pokemon.findAll({
    order: [['pokedex_number', 'ASC']]
  });
  const pokemon = pokemonData.map(p => p.get({ plain: true }));
  
  res.render('createTrade', { pokemon });  // ← Passing 'pokemon' here
});

router.post('/create-trade', async (req, res) => {
  try {
   // Need to force the id to be an array if only one was selected so my for loop wont iterate the string by character
    const wantedPokemonArray = Array.isArray(req.body.pokemon_wanted)
        ? req.body.pokemon_wanted
        : [req.body.pokemon_wanted];

    const offeredPokemonArray = Array.isArray(req.body.pokemon_offered)
        ? req.body.pokemon_offered
        : [req.body.pokemon_offered];

    const [user] = await User.findOrCreate({
        where: { pogo_username: req.body.username },
    });

    const newTrade = await Trade.create({
        user_id: user.id,
        notes: req.body.notes,
        mirror_trade: req.body.mirror_trade ? true : false
    });
    
    for (let pokemonId of wantedPokemonArray) {
        await TradeWantedPokemon.create({
            trade_id: newTrade.id,
            pokemon_id: pokemonId
        });
    };

    for (let pokemonId of offeredPokemonArray) {
        await TradeOfferedPokemon.create({
            trade_id: newTrade.id,
            pokemon_id: pokemonId
        });
    };
    
    // Send back to homepage (temporary)
    res.redirect('/');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;