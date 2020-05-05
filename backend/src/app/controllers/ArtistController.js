const artist = require('../models/artist');
const bcrypt = require('bcryptjs');
const authMethod = require('../../utils/authMethod');
const musics = require('../models/music');
const users_like_musics = require('../models/users_like_musics');

module.exports = {
    async store(req, res) {
        const { name, name_artistic, email, pass } = req.body;

        const { filename: avatar } = req.file;

        const newartist = await artist.findOne({ where: { email } });

        if (newartist) {
            return res.status(400).json({
                Error:
                    'Artist already exists in database (email already registred) ',
            });
        }

        const nameArtistExists = await artist.findOne({
            where: { name_artistic },
        });

        if (nameArtistExists) {
            return res.status(400).json({
                Error:
                    'Artist already exists in database (name already registred) ',
            });
        }

        const password = await bcrypt.hash(pass, 10);

        await artist.create({
            name,
            name_artistic,
            email,
            password,
            avatar,
        });

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
            limit: 1,
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

        const {
            name,
            name_artistic,
            newemail = infoToken.email,
            pass,
            oldpass,
        } = req.body;

        const oldDataArts = await artist.findOne({
            where: {
                email: infoToken.email,
            },
            limit: 1,
        });

        const img = req.file;
        console.log(req.file);
        let avatar = '';

        if (!img) {
            avatar = oldDataArts.avatar;
        } else {
            avatar = img.filename;
        }

        const passwordold = await bcrypt.compare(oldpass, oldDataArts.password);

        if (!passwordold) {
            return res.status(401).json({ Error: 'Old password is invalid' });
        }

        const password = await bcrypt.hash(pass, 10);

        await artist.update(
            { name, name_artistic, email: newemail, password, avatar },
            { where: { email: infoToken.email } }
        );

        return res.json({ message: 'Artist updated with success! ' });
    },

    async show(req, res) {
        const likesMusics = [];
        const { authorization } = req.headers;
        const { id: user } = await authMethod(authorization);

        const { idArtist: id } = req.body;

        const info = await artist.findOne({
            where: {
                id,
            },
        });

        if (!info) {
            return res.json({
                Error: 'Sorry, but this artist doesnt exists! :(',
            });
        }

        const musicsOfArtists = await musics.findAll({
            where: {
                singer: id,
            },
        });

        return res.json({
            Artist: {
                name: info.name,
                name_artistic: info.name_artistic,
                avatar: info.avatar,
                id: info.id,
            },

            Musics: {
                musicsOfArtists,
            },
        });
    },
};
