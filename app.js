// app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o diretório de views e o mecanismo de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do middleware de sessão
app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Importar e usar as rotas
const indexRoutes = require('./routes/index');
const loginRequiredRoutes = require('./routes/loginRequired');
const authRoutes = require('./routes/auth');

app.use('/', indexRoutes);
app.use('/loginRequired', loginRequiredRoutes);
app.use('/auth', authRoutes);

// Rota protegida
app.get('/loginRequired', (req, res) => {
  if (req.session.loggedin) {
    res.render('loginRequired', { username: req.session.username });
  } else {
    res.redirect('/auth/login');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
