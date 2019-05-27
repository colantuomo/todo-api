const router = require('express').Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/validate-token', async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    jwt.verify(token, 'secret-key', (err, data) => {
        if (err) {
            return res.status(403).send({ error: 'Invalid Token' })
        }
        return res.status(200).send({ error: null });
    })
})

router.post('/login', async (req, res, next) => {
    const result = await validateUser(req, res);
    return res.status(result.status).send(result);
})

router.post('/register', async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await new User(req.body).save().catch(err => {
        res.status(403).send({ error: err });
    });
    const token = await generateToken(user);
    res.json({ user, token });
})

async function validateUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return { data: null, error: 'Invalid credentials', status: 403 };
    }
    if (!await bcrypt.compare(password, user.password)) {
        return { data: null, error: 'Invalid credentials', status: 403 };
    }
    const token = await generateToken(user);
    return { data: { user, token }, error: null, status: 200 };
}

async function generateToken(user) {
    return await jwt.sign({ user }, 'secret-key', { expiresIn: '10h' });
}

module.exports = router;