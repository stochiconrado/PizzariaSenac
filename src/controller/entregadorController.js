const db = require('../db');
const Joi = require('joi');

const entregadorSchema = Joi.object({
  cnh: Joi.string().length(9).required(),
  nome_entregador: Joi.string().required(),
  telefone: Joi.string().required(),
  id_regiao: Joi.string().required(),
});

exports.listarEntregador = (req,res)=>{
  db.query('SELECT * FROM entregador', (err, result) =>{
    if(err){
      console.error('Erro ao buscar enteregador: ', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};

exports.buscarEntregador = (req,res)=>{
  const{id} = req.params;
  db.query('SELECT * FROM entregador WHERE id = ?',id, (err, result) =>{
    if(err){
      console.error('Erro ao buscar entregador:', err);
      res.status(500).jsaon({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length === 0){
      res.status(404).json({error: 'Driver not found'});
      return;
    }
    res.json(result[0]);
  });
};

exports.buscarEntregadorNome = (req,res)=>{
  const{nome_entregador} = req.params;
  db.query('SELECT * FROM entregador WHERE nome_entregador LIKE ?',[`${nome_entregador}%`],(err, result) =>{
    if(err){
      console.error('Erro ao buscar entregador:', err);
      res.status(500).jsaon({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length === 0){
      res.status(404).json({error: 'Driver not found'});
      return;
    }
    res.json(result[0]);
  });
};

exports.adicionarEntregador = (req, res)=>{
  const {cnh, nome_entregador, telefone, id_regiao} = req.body;
  const{error} = entregadorSchema.validate({cnh, nome_entregador, telefone, id_regiao});
  if(error){
    res.status(400).json({error: 'Dados de entregador inválidos'});
    return;
  }
  const novoEntregador = {cnh, nome_entregador, telefone, id_regiao};
  db.query('INSERT INTO entregador SET ?', novoEntregador, (err, result) => {
    if(err){
      console.error('Erro ao adicionar entregador', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.jason({message: 'Entregador adicionado com sucesso'});
  });
};

exports.atualizarEntregador = (req,res) =>{
  const {id} = req.params;
  const {cnh, nome_entregador, telefone, id_regiao} = req.body;
  const {error} = entregadorSchema.validate({cnh, nome_entregador, telefone, id_regiao});
  if (error){
    res.status(400).json({error: 'Dados de entregador inválidos'});
    return;
  }
  const entregadorAtualizado = {cnh, nome_entregador, telefone, id_regiao};
  db.query('UPDATE entregador SET ? WHERE id = ?', [entregadorAtualizado, id], (err, result)=>{
    if(err){
      console.error('Erro ao atualizar entregador:', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'entregador atualizado com sucesso'});
  });
};

exports.deletarEntregador = (req,res)=>{
  const{id} = req.params;
  db.query('DELETE FROM entregador WHERE cnh = ?', id, (err, result)=>{
    if(err){
      console.error('Erro ao deletar entregador:', err);
      res.status(500).json({ error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'entregador deletado com sucesso'});
  });
};
