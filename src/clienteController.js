const db = require('./db'); // importando o nosso módulo de conexão com o banco
const Joi = require('joi'); 
/* JOI - valida se esta estrutura de banco de dados atende a uma validação criada no banco impedindo que o erro passe or aqui e chegue até o banco */

//validação dos dados
const clienteSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  nome: Joi.string().required(),
  endereco: Joi.string().required(),
  bairro:Joi.string().required(),
  complemento: Joi.string().required(),
  cep: Joi.string().required(),
  telefone: Joi.string().required(),
  email:Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

//Listar todos os clientes
// QUERY acessa objeto de querystring da requisição
exports.listarClientes = (req, res) =>{
  db.query('SELECT * FROM cliente', (err, result) => {
    if(err){
      console.error('Error ao buscar clientes:', err);
      res.status(500).json({error:'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};

//Buscar um único cliente por primary key = CPF
exports.buscarClientes = (req, res) => {
  const {cpf} = req.params; // req.params acessa os parametros

  db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
    if(err) {
      console.error('Erro ao buscar cliente:', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length === 0) {
      res.status(404).json({error: 'Client not found'});
      return;
    }
    res.json(result[0]); // retorna o primeiro cliente encontrado (deve ser único)
  });
};