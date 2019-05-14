const router = require('express').Router();
const Task = require('../models/taskModel');
const auth = require('../middlewares/auth');

router.get('/', auth.checkToken, async (req, res, next) => {
    const tasks = await Task.find().sort({ active: -1, date: -1 });
    return res.json(tasks);
})

router.post('/', auth.checkToken, async (req, res, next) => {
    const data = await new Task(req.body).save();
    return res.json(data);
})

router.put('/', auth.checkToken, async (req, res, next) => {
    const options = { new: true };
    const data = await Task.findByIdAndUpdate(req.body._id, req.body, options);
    return res.json(data);
})

router.delete('/:id', auth.checkToken, async (req, res, next) => {
    const data = await Task.findByIdAndDelete(req.params.id);
    return res.json(data);
})

router.get('/dashboard', auth.checkToken, async (req, res, next) => {
    const todo = await Task.find({ active: true });
    const done = await Task.find({ active: false });
    const all = await Task.find();
    return res.json({ todo: todo.length, done: done.length, all: all.length });
})

router.get('/:type', auth.checkToken, async (req, res, next) => {
    const tasks = await Task.find({ active: req.params.type }).sort({ date: -1 });
    return res.json(tasks);
})

module.exports = router;