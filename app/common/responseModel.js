exports.send = async function (res, status, data, error) {
    return res.status(status).send({ data, error });
}