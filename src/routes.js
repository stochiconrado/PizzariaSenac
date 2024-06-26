const express = require('express');//importando express
const path = require('path'); //importando path o path retorna o caminho de forma dinâmica

const router = express.Router(); //Isso permite que a gente crie diferentes url's e endpoints para que o frontend possa fazer chamadas
router.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname+'/pages/home.html'))
});

const loginController = require('./controller/loginController.js');
router.post('/login', loginController.loginCliente);

const clienteController = require('./controller/clienteController.js');
router.get('/clientes', loginController.autenticarToken, clienteController.listarClientes);
router.get('/clientes/:cpf', loginController.autenticarToken, clienteController.buscarClientesCPF);
router.get('/clientes/nome/:nome', loginController.autenticarToken, clienteController.buscarClientesNome);
router.post('/clientes', clienteController.adicionarCliente); //POST: Aceita criar algum objeto do servidor.
router.patch('/clientes/:cpf', loginController.autenticarToken, clienteController.atualizarCliente); //PUT: Aceita substituir algum objeto do servidor. PATCH: Aceita alterar algum objeto do servidor
router.delete('/clientes/:cpf', loginController.autenticarToken, clienteController.deletarCliente);//DELETE: Informa por meio do URL o objeto a ser deletado

const produtoController = require('./controller/produtoController.js');
router.get('/produtos', produtoController.listarProduto);
router.get('/produtos/:id', produtoController.buscarProdutoId);
router.get('/produtos/nome/:nome_produto', produtoController.buscarProdutoNome);
router.post('/produtos', loginController.autenticarToken, produtoController.adicionarProduto);
router.patch('/produtos/:id', loginController.autenticarToken, produtoController.atualizarProduto);
router.delete('/produtos/:id',loginController.autenticarToken, produtoController.deletarProduto);

const regiaoController = require('./controller/regiaoController.js');
router.get('/regiao', regiaoController.listarRegiao);
router.get('/regiao/:bairros', regiaoController.buscarRegiao);
router.post('/regiao', regiaoController.adicionarRegiao);
router.patch('/regiao/:id', regiaoController.atualizarRegiao);
router.delete('/regiao/:id', regiaoController.deletarRegiao);

const entregadorController = require('./controller/entregadorController.js');
router.get('/entregador', entregadorController.listarEntregador);
router.get('/entregador/:nome_entregador', entregadorController.buscarEntregadorNome);
//router.get('/entregador/:id', entregadorController.buscarEntregador);
router.post('/entregador', entregadorController.adicionarEntregador);
router.patch('/entregador/:id', entregadorController.atualizarEntregador);
router.delete('/entregador/:id', entregadorController.deletarEntregador);

const pedidoController = require('./controller/pedidoController.js');
router.use('/pedidos', loginController.autenticarToken)
router.get('/pedidos', pedidoController.listarPedido);
router.get('/pedidos/:id', pedidoController.buscarPedido);
router.get('/pedidos/cpf/:cpf', pedidoController.buscarPedidosCpf);
router.post('/pedidos', pedidoController.adicionarPedido);
router.patch('/pedidos/:id', pedidoController.atualizarPedido);
router.delete('/pedidos/:id', pedidoController.deletarPedido);

const itemPedidoController = require('./controller/itemPedidoController.js');
router.get('/itemPedido', itemPedidoController.listarItemPedido);
router.get('/itemPedido/:id', itemPedidoController.buscarItemPedido);
router.patch('/itemPedido/:id', itemPedidoController.atualizarItemPedido);
router.delete('/itemPedido/:id', itemPedidoController.deletarItemPedido);

module.exports = router;