// Need to import pokemon model for seeding (no /Pokemon.js because we want it to pull from index to use associations)
const { Pokemon, sequelize } = require('../models')
require('dotenv').config();


// Gets a list of all pokemon names
async function getRawPokemon() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        if (!response.ok) {
            throw new Error('Invalid response from server');
        }
    const rawPokemon = await response.json();
    console.log("Pokemon successfully fetched");
    return rawPokemon;
    
    } catch(err) {            
        console.error('There was an error fetching the pokemon');
    };
};

// Using the list from part to get the details + sprite for each pokemon
async function getPokemonDetails(rawPokemon) {
    try {
        const response = await Promise.all
        (rawPokemon.map(pokemon => fetch(pokemon.url)
        .then(res => res.json())));
        console.log(response[0]); // Should show me bulbasaur details
        return response;
    } catch(err) {
        console.error('There was an error fetching details');
    };
};

//Helper function to figure out the generation
function getGeneration(id) {
  if (id <= 151) return 1;
  if (id <= 251) return 2;
  if (id <= 386) return 3;
  if (id <= 493) return 4;
  if (id <= 649) return 5;
  if (id <= 721) return 6;
  if (id <= 809) return 7;
  if (id <= 905) return 8;
  if (id <= 1025) return 9;
}; 


// Final function to seed the tables with the data
async function seedPokemon() {
    const rawPokemon = await getRawPokemon();
    const pokemonDetails = await getPokemonDetails(rawPokemon.results);
    const pokemonData = pokemonDetails.map(pokemon => ({
        pokedex_number: pokemon.id,
        name: pokemon.name,
        sprite_url: pokemon.sprites.front_default,
        generation: getGeneration(pokemon.id),
        type1: pokemon.types[0].type.name,
        type2: (pokemon.types[1]) ? pokemon.types[1].type.name : null
    }));
    Pokemon.bulkCreate(pokemonData);
    await sequelize.close(); //Stops the script from hanging
};

seedPokemon();