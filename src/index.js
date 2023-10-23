//Criando o index.js
//Criação de uma aplicação EXPRESS
const express = require('express');//importando express
const path = require('path'); //importando path o path retorna o caminho de forma dinâmica
const app = express(); //o app irá receber o express e todas as suas dependências
const router = express.Router(); //Isso permite que a gente crie diferentes url's e endpoints para que o frontend possa fazer chamadas

router.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+'/pages/home.html'))
})
/* Aqui definimos nossa rota para o arquivo html usando o path para sempre retornar dinamicamente o que vem antes da '/pages/home.html'
tudo que se encontra depois da barra '/' serão nossas rotas*/
app.use(router);
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