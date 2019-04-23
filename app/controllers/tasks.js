const router = require('express').Router();
const Task = require('../models/tasks')

router.get('/', async (req, res, next) => {
    const tasks = await Task.find().sort({ active: -1, date: -1 });
    return res.json(tasks);
})

router.post('/', async (req, res, next) => {
    const data = await new Task(req.body).save();
    return res.json(data);
})

router.put('/', async (req, res, next) => {
    // console.log(req.body);
    const options = { new: true };
    const data = await Task.findByIdAndUpdate(req.body._id, req.body, options);
    return res.json(data);
})

router.delete('/:id', async (req, res, next) => {
    const data = await Task.findByIdAndDelete(req.params.id);
    return res.json(data);
})

router.get('/dashboard', async (req, res, next) => {
    const todo = await Task.find({ active: true });
    const done = await Task.find({ active: false });
    const all = await Task.find();
    return res.json({ todo: todo.length, done: done.length, all: all.length });
})

router.get('/:type', async (req, res, next) => {
    const tasks = await Task.find({ active: req.params.type }).sort({ date: -1 });
    return res.json(tasks);
})

module.exports = router;