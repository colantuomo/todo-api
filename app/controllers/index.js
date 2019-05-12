const router = require('express').Router();
const tasks = require('./tasksController');
const users = require('./userController');

router.use('/tasks', tasks);
router.use('/auth', users);

module.exports = router;

//Gerenciador das rotas