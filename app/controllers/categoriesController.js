const router = require('express').Router();
const Category = require('../models/categoryModel');
const auth = require('../middlewares/auth');

router.get('/', auth.checkToken, async (req, res, next) => {
    const data = await Category.find();
    return res.json(data);
})

router.post('/', auth.checkToken, async (req, res, next) => {
    const data = { userId: req.user_id, name: req.body.category };
    const result = await new Category(data).save();
    return res.json(result);
})

router.delete('/:id', auth.checkToken, async (req, res, next) => {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.json(data);
})

module.exports = router;