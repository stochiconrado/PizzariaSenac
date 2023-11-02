const db = require('./db');
const Joi = require('joi');

const regiaoSchema = Joi.object({
  id_regiao:Joi.string().required(),
  nome_regiao: Joi.string().required(),
  bairros: Joi.string().required(),
});

exports.listarRegiao = (req, res) => {
  db.query('SELECT * FROM regiao', (err,result)=>{
    if(err){
      console.error('Erro ao buscar região',err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json(result);
  });
};

exports.buscarRegiao = (req, res) => {
  const {id_regiao} = req.params;
  db.query('SELECT * FROM regiao WHERE id_regiao = ?', id_regiao, (err,result)=>{
    if(err){
      console.error('Erro ao buscar região', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    if(result.length===0){
      res.status(404).json({error: 'Region not found'});
      return;
    }
    res.json(result[0]);
  });
};

exports.adicionarRegiao = (req, res) => {
  const {id_regiao,nome_regiao, bairros} = req.body;
  const {error} = regiaoSchema.validate({id_regiao,nome_regiao,bairros});
  if(error){
    res.status(400).json({error: 'Dados de região inválido'});
    return;
  }
  const novaRegiao={id_regiao,nome_regiao,bairros};
  db.query('INSERT INTO regiao SET ?', novaRegiao, (err, result)=>{
    if(err){
      console.error('Erro ao adicionar região', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Região adicionada com sucesso'})
  });
};

exports.atualizarRegiao = (req, res)=>{
  const {id_regiao}= req.params;
  const{nome_regiao, bairros} = req.body;
  const{error}=regiaoSchema({id_regiao, nome_regiao, bairros});
  if(error){
    res.status(400).json({error: 'Dados de região inválidos'});
    return;
  }
  const regiaoAtualizada = {id_regiao, nome_regiao, bairros};
  db.query('UPDATE produto SET ? WHERE id_regiao = ?', [regiaoAtualizada, id_regiao], (err, result) =>{
    if(err){
      console.error('Erro ao atualizar região', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Região atualizada com sucesso'})
  });
};

exports.deletarRegiao = (req,res)=>{
  const{id_regiao} = req.params;
  db.query('DELETE FROM regiao WHERE id_regiao = ?', id_regiao, (err,result)=>{
    if(err){
      console.error('Erro ao deletar região', err);
      res.status(500).json({error: 'Erro interno do servidor'});
      return;
    }
    res.json({message: 'Região deletada com sucesso'});
  });
};