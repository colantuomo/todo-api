const router = require('express').Router();
const routes = require('../controllers');

router.use('/api/v1', routes)

module.exports = router;

// gerenciar rotas de API e exportar modulo