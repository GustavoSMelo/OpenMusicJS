const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const tokenConfig = require('../../config/token/tokenConfig');

module.exports = {
    async store(req, res) {
        const { name, email, pass } = req.body;

        const newuser = await user.findOne({ where: { email } });

        if (newuser) {
            return res
                .status(400)
                .json({ Error: 'Erro in create a new user ' });
        }

        const password = await bcrypt.hash(pass, 10);

        const created = await user.create({ name, email, password });

        if (!created) {
            return res.status(500).json({ Error: '' });
        }

        return res.json({ message: 'User created with success!  ' });
    },

    async index(req, res) {
        const users = await user.findAll();

        if (users.length <= 0) {
            return res
                .status(404)
                .json({ Error: 'Any account is registred in database ' });
        }

        return res.json(users);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const [_, token] = authHeader.split(' ');

        const infoToken = await promisify(jwt.verify)(
            token,
            tokenConfig.secret
        );

        const deleted = await user.destroy({
            where: {
                id: infoToken.id,
            },
        });

        if (!deleted) {
            return res
                .status(401)
                .json({ Error: 'Token expires!, please, do login again ' });
        }

        return res.json({ message: 'User deleted with success! ' });
    },
};
