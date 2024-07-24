const express = require('express');
const produtos = require('./controladores/funcoes');
const rotas = express();

rotas.get('/produtos', produtos.listagem);
rotas.get('/produtos/:id', produtos.detalhamento);
rotas.get('/produtos/:id/frete/:cep', produtos.calculoFrete);

module.exports = rotas;