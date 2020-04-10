const Albuns = require('../models/albuns');
const authMethod = require('../../utils/authMethod');
const users_like_albuns = require('../models/users_like_albuns');

module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { album } = req.body;

        if (!album) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const isAlbumExists = await Albuns.findOne({
            where: {
                id: album,
            },
        });

        if (!isAlbumExists) {
            return res.status(400).json({ Error: 'Album doesnt exists ' });
        }

        const isLikeExists = await users_like_albuns.findOne({
            where: {
                album,
                user,
            },
        });

        if (isLikeExists) {
            return res
                .status(400)
                .json({ Error: 'U already like this album ' });
        }

        await users_like_albuns.create({ user, album });

        return res.json({ message: 'Album liked with success ' });
    },

    async index(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const likes = await users_like_albuns.findAll({
            where: {
                user,
            },
        });

        if (!likes || likes.length <= 0) {
            return res.json([]);
        }

        return res.json(likes);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { album } = req.headers;

        const isAlbumExists = await Albuns.findOne({ where: { id: album } });

        if (!isAlbumExists) {
            return res.status(404).json({ Error: 'Album didnt find ' });
        }

        const isLiked = await users_like_albuns.findOne({
            where: {
                user,
                album,
            },
        });

        if (!isLiked) {
            return res.status(400).json([]);
        }

        await users_like_albuns.destroy({
            where: {
                user,
                album,
            },
            limit: 1,
        });

        return res.json({ message: 'Like Removed with success! ' });
    },
};
