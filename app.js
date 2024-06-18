// app.js
const express = require('express');  // Importa o módulo Express
const path = require('path');  // Módulo para lidar com caminhos de arquivos
const session = require('express-session');  // Middleware de sessão para Express
const bodyParser = require('body-parser');  // Middleware para analisar o corpo das requisições

const app = express();  // Cria uma instância do aplicativo Express
const port = 3000;  // Define a porta na qual o servidor irá rodar

// Configurar o diretório de views e o mecanismo de template
app.set('views', path.join(__dirname, 'views'));  // Define o diretório das views como './views'
app.set('view engine', 'ejs');  // Define o mecanismo de template como EJS

// Middleware para servir arquivos estáticos (opcional)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analisar o corpo das requisições
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do middleware de sessão
app.use(session({
  secret: 'secreto',  // Chave secreta para assinar a sessão
  resave: false,  // Evita regravar a sessão se não houver alterações
  saveUninitialized: true,  // Salva sessões novas não inicializadas
  cookie: { secure: false } // Use 'true' em produção com HTTPS.
}));

// Importar e usar as rotas
const indexRoutes = require('./routes/index');  // Importa as rotas principais
const loginRequiredRoutes = require('./routes/loginRequired');  // Importa as rotas que requerem login
const authRoutes = require('./routes/auth');  // Importa as rotas de autenticação

app.use('/', indexRoutes);  // Usa as rotas principais na rota raiz '/'
app.use('/loginRequired', loginRequiredRoutes);  // Usa as rotas de login requerido em '/loginRequired'
app.use('/auth', authRoutes);  // Usa as rotas de autenticação em '/auth'

// Rota protegida
app.get('/loginRequired', (req, res) => {
  // Verifica se o usuário está autenticado
  if (req.session.loggedin) {
    res.render('loginRequired', { username: req.session.username });  // Renderiza a view 'loginRequired' se autenticado
  } else {
    res.redirect('/auth/login');  // Redireciona para a página de login se não estiver autenticado
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);  // Exibe mensagem indicando que o servidor está rodando
});
