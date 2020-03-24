const user = require('../models/user');
const bcrypt = require('bcryptjs');
const authMethod = require('../../utils/authMethod');
const users_like_albuns = require('../models/users_like_albuns');
const users_like_musics = require('../models/users_like_musics');
const users_like_artists = require('../models/users_like_artists');

module.exports = {
    async store(req, res) {
        const { name, email, pass } = req.body;

        if (!name || !email || !pass) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const { filename: avatar } = req.file;

        console.log(req.file);
        console.log(` | Name > ${avatar}`);

        if (!avatar) {
            return res.status(400).json({
                Error: `Please, insert ur avatar image to continue the register ${req.file}`,
            });
        }

        const newuser = await user.findOne({ where: { email } });

        if (newuser) {
            return res.status(400).json({ Error: 'User already exists ' });
        }

        const password = await bcrypt.hash(pass, 10);

        await user.create({
            name,
            email,
            password,
            avatar,
        });

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
            limit: 1,
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

        const oldDataUser = await user.findOne({
            where: {
                email: infoToken.email,
            },
        });

        const {
            name = oldDataUser.name,
            newemail = infoToken.email,
            pass,
            oldpass,
        } = req.body;

        const img = req.file;
        let avatar = '';

        if (!img) {
            avatar = oldDataUser.avatar;
        } else {
            avatar = img.filename;
        }

        if (!pass) {
            await user.update(
                { name, email: newemail, avatar },
                { where: { email: infoToken.email }, limit: 1 }
            );
        } else {
            const passwordold = await bcrypt.compare(
                oldpass,
                oldDataUser.password
            );

            if (!passwordold) {
                return res
                    .status(401)
                    .json({ Error: 'Old password is invalid' });
            }

            const password = await bcrypt.hash(pass, 10);

            await user.update(
                { name, email: newemail, password, avatar },
                { where: { email: infoToken.email }, limit: 1 }
            );
        }

        return res.json({ message: 'User updated with success! ' });
    },

    async show(req, res) {
        const { authorization } = req.headers;

        const info = await authMethod(authorization);

        const dataUser = await user.findOne({
            where: {
                id: info.id,
            },
        });

        const dataUserAlbuns = await users_like_albuns.findAll({
            where: {
                user: info.id,
            },
        });

        const dataUserMusics = await users_like_musics.findAll({
            where: {
                user: info.id,
            },
        });

        const dataUserArtists = await users_like_artists.findAll({
            where: {
                user: info.id,
            },
        });

        return res.json({
            user: {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email,
                avatar: dataUser.avatar,
            },

            user_artist: {
                dataUserArtists,
            },

            user_albuns: {
                dataUserAlbuns,
            },

            user_musics: {
                dataUserMusics,
            },
        });
    },
};
