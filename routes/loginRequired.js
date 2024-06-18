// routes/loginRequired.js

// Importa o framework Express e cria um objeto router para gerenciar rotas
const express = require('express');
const router = express.Router();

// Rota para a página protegida que requer autenticação
router.get('/', (req, res) => {
    // Verifica se o usuário está autenticado através da sessão
    if (req.session.loggedin) {
        // Renderiza a página 'loginRequired' passando o username armazenado na sessão
        res.render('loginRequired', { username: req.session.username });
    } else {
        // Redireciona para a página de login se o usuário não estiver autenticado
        res.redirect('/auth/login');
    }
});

// Exporta o objeto router para ser utilizado por outros arquivos da aplicação
module.exports = router;
