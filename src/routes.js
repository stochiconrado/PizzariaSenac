const express = require('express');//importando express
const path = require('path'); //importando path o path retorna o caminho de forma dinâmica

const router = express.Router(); //Isso permite que a gente crie diferentes url's e endpoints para que o frontend possa fazer chamadas
router.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+'/pages/home.html'))
});

const clienteController = require('./clienteController.js');
router.get('/clientes', clienteController.listarClientes);
router.get('/clientes/:cpf', clienteController.buscarClientes);
router.post('/clientes', clienteController.adicionarCliente); //POST: Aceita criar algum objeto do servidor.
router.patch('/clientes/:cpf', clienteController.atualizarCliente); //PUT: Aceita substituir algum objeto do servidor. PATCH: Aceita alterar algum objeto do servidor
router.delete('/clientes/:cpf',clienteController.deletarCliente);//DELETE: Informa por meio do URL o objeto a ser deletado

const produtoController = require('./produtoController.js');
router.get('/produto', produtoController.listarProduto);
router.get('/produto/:id', produtoController.buscarProduto);
router.post('/produto', produtoController.adicionarProduto);
router.patch('/produto/:id', produtoController.atualizarProduto);
router.delete('/produto/:id',produtoController.deletarProduto);

const regiaoController = require('./regiaoController.js');
router.get('/regiao', regiaoController.listarRegiao);
router.get('/regiao/:id', regiaoController.buscarRegiao);
router.post('/regiao', regiaoController.adicionarRegiao);
router.patch('/regiao/:id', regiaoController.atualizarRegiao);
router.delete('/regiao/:id', regiaoController.deletarRegiao);

const entregadorController = require('./entregadorController.js');
router.get('/entregador', entregadorController.listarEntregador);
router.get('/entregador/:id', entregadorController.buscarEntregador);
router.post('/entregador', entregadorController.adicionarEntregador);
router.patch('/entregador/:id', entregadorController.atualizarEntregador);
router.delete('/entregador/:id', entregadorController.deletarEntregador);

module.exports = router;