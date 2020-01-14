const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/user');
const tokenConfig = require('../../config/token/tokenConfig');

module.exports = {
    async store(req, res) {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ Error: 'Credential not sended ' });
        }

        const userExists = await user.findOne({ where: { email } });

        if (!userExists) {
            return res.status(401).json({ Error: 'User invalid ' });
        }

        const password = await bcrypt.compare(pass, userExists.password);

        if (!password) {
            return res.status(401).json({ Error: 'Password invalid ' });
        }

        return res.json({
            user: {
                name: userExists.name,
                email,
            },

            token: jwt.sign(
                {
                    id: userExists.id,
                    name: userExists.name,
                    email,
                },
                tokenConfig.secret,
                {
                    expiresIn: tokenConfig.expiresIn,
                }
            ),
        });
    },
};
