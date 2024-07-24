const { listarPokemons, detalharPokemon } = require('utils-playground');

const pokemons = async (req, res) => {
    const { pagina } = req.query;
    const listagem = await listarPokemons(pagina ?? 1);
    return res.json(listagem);
};

const pokemon = async (req, res) => {
    const { idOuNome } = req.params;
    const encontrado = await detalharPokemon(idOuNome);

    const { id, name, height, weight, base_experience, forms, abilities, species } = encontrado;

    return res.json({ id, name, height, weight, base_experience, forms, abilities, species });
};

module.exports = { pokemons, pokemon };