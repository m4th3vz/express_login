// models/index.js

const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Configuração do Sequelize para usar SQLite como banco de dados
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

// Definição do modelo de Usuário ('User') com Sequelize
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Sincroniza o modelo com o banco de dados. Isso cria a tabela 'Users' se ela não existir.
sequelize.sync();

// Exporta o objeto sequelize (instância do Sequelize) e o modelo User para serem utilizados em outros arquivos da aplicação
module.exports = { sequelize, User };
