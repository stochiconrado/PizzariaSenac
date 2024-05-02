//Criação de uma aplicação EXPRESS
const express = require('express');//importando express
const path = require('path'); //importando path o path retorna o caminho de forma dinâmica
const db = require('./db.js'); //importando o nossso módulo dde conexão com o banco
const app = express(); //o app irá receber o express e todas as suas dependências
const cors = require('cors');
const routes = require('./routes.js'); //módulo de routes

app.use(express.json()); // aqui trnasformamos os dados que chegam como binário em json

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers: Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  app.use(cors())
  next();
})

/* Aqui definimos nossa rota para o arquivo html usando o path para sempre retornar dinamicamente o que vem antes da '/pages/home.html'
tudo que se encontra depois da barra '/' serão nossas rotas*/
app.use('/', routes);

/* Após declarar nossas rotas aqui falamoos para noss app usar elas como referência */
app.listen(3030, () =>{console.log('servidor rodando');}); //aqui definimos quem irá escutar nosso chamado e nos responder

app.get('/hello', (req, res) => {
  console.log('get funcionando');
  res.send({message: 'Hello World!'});
});
/* dentro do get já definimos uma função anônima CALLBACK, que recebe uma requisição com o REQUEST e que retorna uma resposta com o REPLY */
app.get('/usuario', (req, res) => {
  console.log('get usuario funcionando');
  res.send({usuario: 'bartølomeu'})
});