const { getStateFromZipcode } = require('utils-playground');
const produtos = require('../bancodedados/produtos');

const listagem = async (req, res) => {
    res.status(200).json(produtos);
};

const detalhamento = async (req, res) => {
    const { id } = req.params;

    const idEncontrado = produtos.find((produto) => {
        return produto.id === Number(id);
    });

    if (!idEncontrado) {
        return res.status(404).json({ mensagem: 'Não encontrado.' });
    }

    return res.status(200).json(idEncontrado);
};

const calculoFrete = async (req, res) => {
    const { id, cep } = req.params;

    const produto = produtos.find(produto => {
        return produto.id === Number(id);
    });

    if (!produto) {
        return res.status(404).json({ mensagem: 'Não encontrado.' });
    }
    const estado = await getStateFromZipcode(cep);

    let valorFrete = 0;

    if (estado === 'SP' || estado === 'RJ') {
        valorFrete = produto.valor * 0.15;
        return res.json({
            produto,
            estado,
            frete: valorFrete
        });
    } else if (estado === 'BA' || estado === 'SE' || estado === 'AL' || estado === 'PE' || estado === 'PB') {
        valorFrete = produto.valor * 0.10;
        return res.json({
            produto,
            estado,
            frete: valorFrete
        });
    } else {
        valorFrete = produto.valor * 0.12;
        return res.json({
            produto,
            estado,
            frete: valorFrete
        });
    };
};
module.exports = { listagem, detalhamento, calculoFrete };