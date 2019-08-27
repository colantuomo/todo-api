const router = require('express').Router();
const tasks = require('./tasksController');
const categories = require('./categoriesController');
const users = require('./userController');

router.use('/tasks', tasks);
router.use('/categories', categories);
router.use('/auth', users);

module.exports = router;

//Gerenciador das rotas