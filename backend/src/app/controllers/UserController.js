const user = require('../models/user');
const bcrypt = require('bcryptjs');
const authMethod = require('../../utils/authMethod');

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

        const infoToken = await authMethod(authHeader);

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

    async update(req, res) {
        const authHeader = req.headers.authorization;

        const infoToken = await authMethod(authHeader);

        const { name, newemail = infoToken.email, pass, oldpass } = req.body;

        const oldDataUser = await user.findOne({
            where: {
                email: infoToken.email,
            },
        });

        const passwordold = await bcrypt.compare(oldpass, oldDataUser.password);

        if (!passwordold) {
            return res.status(401).json({ Error: 'Old password is invalid' });
        }

        const password = await bcrypt.hash(pass, 10);

        await user.update(
            { name, email: newemail, password },
            { where: { email: infoToken.email } }
        );

        return res.json({ message: 'User updated with success! ' });
    },
};
