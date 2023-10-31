/*Configuração do Banco de Dados MySQL */
const mysql = require('mysql'); //importando mysql

/* Configurando uma conexão com o banco de dados */
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'conrado',
  password: 'W33d0420!',
  database: 'pizzaria',
}); 

// Testar a conexão com o banco de dados
db.connect((err) => {
  if(err){console.error('Error connecting to MYSQL', err);
  }else{
    console.log('Connect');
  }
});
module.exports = db;
/* Aqui declaramos que esta construção será um módulo e que iremos exportar para ser usado. sequir index */