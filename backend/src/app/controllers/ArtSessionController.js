const jwt = require('jsonwebtoken');
const tokenConfig = require('../../config/token/tokenConfig');
const artist = require('../models/artist');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res) {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res
                .status(400)
                .json({ Error: 'Some field is null or undefined ' });
        }

        const art = await artist.findOne({ where: { email } });

        if (!art) {
            return res.status(401).json({ Error: 'Artist not found ' });
        }

        const password = await bcrypt.compare(pass, art.password);

        if (!password) {
            return res.status(401).json({ Error: 'Password invalid ' });
        }

        return res.json({
            user: {
                name_artistic: art.name_artistic,
                email,
                id: art.id,
            },
            token: jwt.sign(
                {
                    name_artistic: art.name_artistic,
                    email,
                    id: art.id,
                },
                tokenConfig.secret,
                {
                    expiresIn: tokenConfig.expiresIn,
                }
            ),
        });
    },
};
