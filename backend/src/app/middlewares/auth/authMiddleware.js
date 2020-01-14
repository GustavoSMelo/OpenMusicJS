const tokenConfig = require('../../../config/token/tokenConfig');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ Error: 'Token didnt send ' });
    }

    const [_, token] = authHeader.split(' ');

    try {
        const verify = await promisify(jwt.verify)(token, tokenConfig.secret);
    } catch (err) {
        return res.status(401).json({ Error: 'Token not valid ' });
    }

    return next();
};
