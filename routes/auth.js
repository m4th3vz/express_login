// routes/auth.js

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Rota para exibir o formulário de registro (GET)
router.get('/register', (req, res) => {
  res.render('register');
});

// Rota para lidar com o envio do formulário de registro (POST)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se o usuário já existe no banco de dados
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.send('Usuário já existe');
  }

  // Criptografa a senha antes de salvar no banco de dados
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashedPassword });
  res.redirect('/auth/login');
});

// Rota para exibir o formulário de login (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Rota para lidar com o envio do formulário de login (POST)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.send('Credenciais inválidas');
  }

  // Compara a senha fornecida com a senha armazenada no banco de dados
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.send('Credenciais inválidas');
  }

  // Configura a sessão do usuário após o login bem-sucedido
  req.session.loggedin = true;
  req.session.username = user.username;
  res.redirect('/loginRequired');
});

// Rota para fazer logout (GET)
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Erro ao fazer logout');
    }
    res.redirect('/');
  });
});

// Exporta o objeto router para ser utilizado por outros arquivos da aplicação
module.exports = router;
