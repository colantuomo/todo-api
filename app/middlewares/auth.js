const jwt = require('jsonwebtoken');

exports.checkToken = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.sendStatus(403);
    }
    const token = authHeader.split(' ')[1];
    req.token = token;
    await jwt.verify(req.token, 'secret-key', (err, data) => {
        if (err) {
            return res.status(403).send({ error: 'Invalid Token' })
        }
        req.user_id = data.user._id;
        req.username = data.user.login;
        next();
    })
}