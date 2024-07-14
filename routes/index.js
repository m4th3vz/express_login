// routes/index.js

const express = require('express');
const router = express.Router();

// Rota para a página inicial (GET '/')
router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.render('index', { title: 'Página Inicial', username: req.session.username });
    } else {
        res.render('index', { title: 'Página Inicial', username: null });
    }
});

module.exports = router;
