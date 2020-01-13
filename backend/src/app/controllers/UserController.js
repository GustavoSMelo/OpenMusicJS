const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

        if (!users) {
            return res
                .status(404)
                .json({ Error: 'Any account is registred in database ' });
        }

        return res.json(users);
    },
};
