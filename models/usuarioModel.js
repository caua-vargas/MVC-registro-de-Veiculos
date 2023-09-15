const database= require('./database');
const md5 = require('md5');

class Usuario{
  constructor(idUsuario, nome, email, senha){
      this.idUsuario=idUsuario;
      this.nome=nome;
      this.email=email;
      this.senha=senha;
  }

  static async auth(email, senha){
      let sql = `SELECT * FROM usuario WHERE email='${email}' AND senha='${md5(senha)}'; `;
      return await database.query(sql);
  }
  static async cadastrar(nome, email, senha){
      return await database.query(`INSERT INTO usuario (nome, email, senha) values ('${nome}', '${email}', '${md5(senha)}');`);
  }
}

module.exports = Usuario;