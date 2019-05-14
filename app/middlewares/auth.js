const jwt = require('jsonwebtoken');

exports.checkToken = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        res.sendStatus(403);
    }

    const token = authHeader.split(' ')[1];
    req.token = token;
    await jwt.verify(req.token, 'secret-key', (err, data) => {
        if (err) {
            res.sendStatus(403)
        }

    })
    next();
}