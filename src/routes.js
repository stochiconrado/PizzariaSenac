const express = require('express');//importando express
const path = require('path'); //importando path o path retorna o caminho de forma dinâmica

const router = express.Router(); //Isso permite que a gente crie diferentes url's e endpoints para que o frontend possa fazer chamadas
router.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+'/pages/home.html'))
});

const clienteController = require('./clienteController.js');
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:cpf', clienteController.buscarClientes);

module.exports = router;