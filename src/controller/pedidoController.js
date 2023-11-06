const db = require('./db');
const Joi = require('joi');

const pedidoSchema = Joi.object({
  id: Joi.string().required(),
  forma_pagto: Joi.string().required(),
  qtde_itens: Joi.string().required(),
  valor_total: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  id_entregador: Joi.string().required(),
});

exports.listarPedido = (req, res) => {
  db.query('SELECT * FROM pedido', (err,result)=>{
    if(err){
      console.error('Erro ao buscar pedido',err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};

exports.buscarPedido = (req, res) => {
  const {id} = req.params;
  db.query('SELECT * FROM pedido WHERE id= ?', id, (err,result)=>{
    if(err){
      console.error('Erro ao buscar pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length===0){
      res.status(404).json({error: 'Pedido not found'});
      return;
    }
    res.json(result[0]);
  });
};

exports.adicionarPedido = (req, res) => {
  const {id, forma_pagto, qtde_itens, valor_total,cpf, id_entregador} = req.body;
  const{error} = pedidoSchema.validate({id, forma_pagto, qtde_itens, valor_total, cpf, id_entregador});
  if(error){
    res.status(400).json({error: 'Dados de pedido inválido'});
    return;
  }
  const novoPedido={id, forma_pagto, qtde_itens, valor_total, cpf, id_entregador};
  db.query('INSERT INTO pedido SET ?', novoPedido, (err, result)=>{
    if(err){
      console.error('Erro ao fazer pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Pedido realizado com sucesso'})
  });
};

exports.atualizarPedido = (req,res)=>{
  const {id}=req.params;
  const{forma_pagto, qtde_itens, valor_total,cpf, id_entregador} = req.body;
  const{error}=pedidoSchema({id,forma_pagto, qtde_itens, valor_total,cpf, id_entregador});
  if(error){
    res.status(400).json({error: 'dados inválidos'});
    return;
  }
  const pedidoAtualizado = {id, forma_pagto, qtde_itens, valor_total,cpf, id_entregador};
  db.query('UPDATE pedido SET ? pedido = ?', [pedidoAtualizado, id],(err,result) =>{
    if(err){
      console.error('erro ao atualizar pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Pedido atualizado com sucesso'})
  });
};

exports.deletarPedido = (req,res)=>{
  const{id} = req.params;
  db.query('DELETE FROM pedido WHERE id = ?', id, (err,result)=>{
    if(err){
      console.error('Erro ao deletar pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Pedido deletado com sucesso'});
  });
};