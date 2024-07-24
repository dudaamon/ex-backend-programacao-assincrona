const express = require('express');
const pokemon = require('./controladores/pokemon');
const rotas = express();

rotas.get('/pokemon', pokemon.pokemons);
rotas.get('/pokemon/:idOuNome', pokemon.pokemon);

module.exports = rotas;