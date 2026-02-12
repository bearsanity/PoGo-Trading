const router = require('express').Router();
const { Pokemon } = require('../models');

router.get('/', async (req, res) =>{
    try {
        const pokemonData = await Pokemon.findAll({
            order: [['id', 'ASC']],
        });

        const pokemon = pokemonData.map((pokemon) => pokemon.get({ plain: true }));

        res.render('home', { pokemon });

    } catch(err) {
    res.status(500).json(err);
 }
});

module.exports = router;