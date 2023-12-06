const db = require('../db');
const Joi = require('joi');

const itemPedidoSchema = Joi.object({
  qtde: Joi.string().required(),
  valor_parcial: Joi.string().required(),
  id_produto: Joi.string().required(),
  id_pedido: Joi.string().required(),
});

exports.listarItemPedido = (req, res) => {
  db.query(`SELECT * FROM item_pedido`, (err, result) => {
    if(err){
      console.error('Erro ao buscar pedido',err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};

exports.buscarItemPedido = (req, res) => {
  const {id} = req.params;
  db.query('SELECT * FROM item_pedido WHERE id = ?', id, (err,result)=>{
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

exports.atualizarItemPedido = (req, res) => {
  const {id} = req.params;
  const {qtde, valor_parcial, id_produto, id_pedido} = req.body;
  const {error}=itemPedidoSchema.validate({qtde, valor_parcial, id_produto, id_pedido});
  if(error){
    res.status(400).json({error: 'dados inválidos'});
    return;
  }
  const pedidoAtualizado = {qtde, valor_parcial, id_produto, id_pedido};
  db.query('UPDATE item_pedido SET ? WHERE id = ?', [pedidoAtualizado, id],(err,result) =>{
    if(err){
      console.error('erro ao atualizar pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Pedido atualizado com sucesso'})
  });
};

exports.deletarItemPedido = (req,res)=>{
  const{id} = req.params;
  db.query('DELETE FROM item_pedido WHERE id = ?', id, (err,result)=>{
    if(err){
      console.error('Erro ao deletar item pedido', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Item pedido deletado do pedido com sucesso'});
  });
};