// models/index.js

// Importando o Sequelize e o DataTypes do pacote 'sequelize'
const { Sequelize, DataTypes } = require('sequelize');

// Importando o módulo 'path' do Node.js para lidar com caminhos de arquivo
const path = require('path');

// Configuração do Sequelize para usar SQLite como banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite', // Utilizando o SQLite como dialect (tipo de banco de dados)
  storage: path.join(__dirname, 'database.sqlite') // Caminho para o arquivo do banco de dados (localizado na mesma pasta deste script)
});

// Definição do modelo de Usuário ('User') com Sequelize
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING, // Campo 'username' do tipo STRING
    allowNull: false, // Não permite valores nulos
    unique: true // Deve ser único (não pode haver dois usuários com o mesmo username)
  },
  password: {
    type: DataTypes.STRING, // Campo 'password' do tipo STRING
    allowNull: false // Não permite valores nulos
  }
});

// Sincroniza o modelo com o banco de dados. Isso cria a tabela 'Users' se ela não existir.
sequelize.sync();

// Exporta o objeto sequelize (instância do Sequelize) e o modelo User para serem utilizados em outros arquivos da aplicação
module.exports = { sequelize, User };
