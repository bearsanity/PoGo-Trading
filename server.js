//=================== Dependencies ===================
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const hbs = exphbs.create({});
require('dotenv').config();
// It knows to use index because it's a default file name that it will look for, rather than usign the individual model files
const { User, Trade, Pokemon, TradeWantedPokemon, TradeOfferedPokemon, sequelize } = require('./models');

//=================== Set up express app ===================
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//=================== Set handlebars as default template engine ===================
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./controllers/')); // Dont forget to finish this

//=================== Start server ===================
app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});