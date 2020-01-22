const artist = require('../models/artist');
const bcrypt = require('bcryptjs');
const authMethod = require('../../utils/authMethod');

module.exports = {
    async store(req, res) {
        const { name, name_artistic, email, pass } = req.body;

        const newartist = await artist.findOne({ where: { email } });

        if (newartist) {
            return res
                .status(400)
                .json({ Error: 'Error in create a new artist ' });
        }

        const password = await bcrypt.hash(pass, 10);

        const created = await artist.create({
            name,
            name_artistic,
            email,
            password,
        });

        if (!created) {
            return res.status(500).json({ Error: '' });
        }

        return res.json({ message: 'Artist created with success!  ' });
    },

    async index(req, res) {
        const arts = await artist.findAll();

        if (arts.length <= 0) {
            return res
                .status(404)
                .json({ Error: 'Any account is registred in database ' });
        }

        return res.json(arts);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const infoToken = await authMethod(authHeader);

        const deleted = await artist.destroy({
            where: {
                id: infoToken.id,
            },
        });

        if (!deleted) {
            return res
                .status(401)
                .json({ Error: 'Token expires!, please, do login again ' });
        }

        return res.json({ message: 'Artist deleted with success! ' });
    },

    async update(req, res) {
        const authHeader = req.headers.authorization;

        const infoToken = await authMethod(authHeader);

        const { name, newemail = infoToken.email, pass, oldpass } = req.body;

        const oldDataArts = await artist.findOne({
            where: {
                email: infoToken.email,
            },
        });

        const passwordold = await bcrypt.compare(oldpass, oldDataArts.password);

        if (!passwordold) {
            return res.status(401).json({ Error: 'Old password is invalid' });
        }

        const password = await bcrypt.hash(pass, 10);

        await artist.update(
            { name, email: newemail, password },
            { where: { email: infoToken.email } }
        );

        return res.json({ message: 'Artist updated with success! ' });
    },
};
