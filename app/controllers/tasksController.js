const router = require('express').Router();
const Task = require('../models/taskModel');
const auth = require('../middlewares/auth');

router.get('/:id', auth.checkToken, async (req, res, next) => {
    const { id } = req.params;
    const tasks = await Task.find({ userId: req.user_id, categoryId: id })
        .sort({ active: -1, date: -1 });
    return res.json(tasks);
})

router.post('/', auth.checkToken, async (req, res, next) => {
    req.body['userId'] = req.user_id;
    req.body['user'] = req.username;
    const data = await new Task(req.body).save();
    return res.json(data);
})

router.put('/', auth.checkToken, async (req, res, next) => {
    const options = { new: true };
    const data = await Task.findByIdAndUpdate({ _id: req.body._id, userId: req.user_id }, req.body, options);
    return res.json(data);
})

router.delete('/:id', auth.checkToken, async (req, res, next) => {
    const data = await Task.findByIdAndDelete(req.params.id);
    return res.json(data);
})

router.get('/dashboard', auth.checkToken, async (req, res, next) => {
    const todo = await Task.find({ active: true, userId: req.user_id });
    const done = await Task.find({ active: false, userId: req.user_id });
    const all = await Task.find({ userId: req.user_id });
    return res.json({ todo: todo.length, done: done.length, all: all.length });
})

router.get('/:type', auth.checkToken, async (req, res, next) => {
    const tasks = await Task.find({ active: req.params.type, userId: req.user_id }).sort({ date: -1 });
    return res.json(tasks);
})

router.post('/search', auth.checkToken, async (req, res, next) => {
    const { param, categoryId } = req.body;
    const tasks = await Task.find({ description: { $regex: '.*' + param + '.*', $options: 'i' }, categoryId, userId: req.user_id }).sort({ date: -1 });
    return res.json(tasks);
})

module.exports = router;