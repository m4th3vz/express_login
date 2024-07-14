// routes/loginRequired.js

const express = require('express');
const router = express.Router();

// Rota para a página protegida que requer autenticação
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('loginRequired', { username: req.session.username });
    } else {
        res.redirect('/auth/login');
    }
});

// Exporta o objeto router para ser utilizado por outros arquivos da aplicação
module.exports = router;
