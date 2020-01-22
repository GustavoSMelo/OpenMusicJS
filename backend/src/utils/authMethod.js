const { promisify } = require('util');
const tokenConfig = require('../config/token/tokenConfig');
const jwt = require('jsonwebtoken');

module.exports = async function returnInfoToken(auth) {
    const [Bearer, token] = auth.split(' ');

    if (!token) {
        res.status(400).json({ Error: 'Token is not sended' });
    }

    const infoToken = await promisify(jwt.verify)(token, tokenConfig.secret);

    return infoToken;
};
