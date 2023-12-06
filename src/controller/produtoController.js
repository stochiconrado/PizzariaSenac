const db = require('../db');
const Joi = require('joi');

const produtoSchema = Joi.object({
  nome_produto:Joi.string().required(),
  descricao:Joi.string().required(),
  valor:Joi.string().required(),
  imagem:Joi.string().required(),
});

exports.listarProduto = (req,res) =>{
  db.query('SELECT * FROM produto', (err,result)=>{
    if (err){
      console.error('Error ao buscar produtos:', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};
exports.buscarProduto = (req,res) =>{
  const {nome_produto} = req.params;
  db.query('SELECT * FROM produto WHERE id = ?',id, (err,result) => {
    if (err){
      console.error('Erro ao buscar produto', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length===0){
      res.status(404).json({error: 'Product not found'});
      return;
    }
    res.json(result[0]);
  });
};

exports.buscarProdutoNome = (req,res) =>{
  const {nome_produto} = req.params;
  db.query('SELECT * FROM produto WHERE nome_produto LIKE ?',[`${nome_produto}%`], (err,result) => {
    if (err){
      console.error('Erro ao buscar produto', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length===0){
      res.status(404).json({error: 'Product not found'});
      return;
    }
    res.json(result);
  });
};

exports.adicionarProduto = (req,res)=> {
  const {nome_produto, descricao, valor, imagem} = req.body;
  const{error} = produtoSchema.validate({nome_produto, descricao, valor, imagem});

  if (error){
    res.status(400).json({error:'Dados de produto inválido'});
    return;
  }
  const novoProduto={nome_produto, descricao, valor, imagem};
  db.query('INSERT INTO produto SET ?', novoProduto, (err, result)=>{
    if(err){
      console.error('Erro ao adicionar produto', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Produto adicionado com sucesso'})
  });
};

exports.atualizarProduto = (req, res) => {
  const {id} = req.params;
  const {nome_produto, descricao, valor, imagem} = req.body;
  const {error}=produtoSchema.validate({nome_produto,descricao, valor, imagem});
  if(error){
    res.status(400).json({error:'Dados de produto inválidos'});
    return;
  }
  const produtoAtualizado ={nome_produto, descricao, valor, imagem};
  db.query('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id], (err, result) => {
    if(err){
      console.error('Erro ao atualizar produto:', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Produto atualizado com sucesso'});
  });
};

exports.deletarProduto = (req, res) => {
  const {id} = req.params;
  db.query('DELETE FROM produto WHERE id = ?', id, (err, result) =>{
    if(err){
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Produto deletado com sucesso'});
  });
};