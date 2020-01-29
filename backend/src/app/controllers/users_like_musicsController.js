const Musics = require('../models/music');
const authMethod = require('../../utils/authMethod');
const users_like_musics = require('../models/users_like_musics');

module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { music } = req.body;

        if (!music) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const musicExists = await Musics.findOne({ where: { id: music } });

        if (!musicExists) {
            return res.status(404).json({ Error: 'Music didnt find ' });
        }

        const UserLikedMusic = await users_like_musics.findOne({
            where: {
                user,
                music,
            },
        });

        if (UserLikedMusic) {
            return res
                .status(400)
                .json({ Error: 'User already liked this music ' });
        }

        await users_like_musics.create({
            user,
            music,
        });

        return res.json({ message: 'User liked music with success ' });
    },

    async index(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const likes = await users_like_musics.findAll({
            where: {
                user,
            },
        });

        if (!likes || likes.length <= 0) {
            return res
                .status(404)
                .json({ Error: 'This user does not like any music ' });
        }

        return res.json(likes);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { music } = req.body;

        const musicExists = await Musics.findOne({ where: { id: music } });

        if (!musicExists) {
            return res.status(404).json({ Error: 'Music didnt find ' });
        }

        const isLiked = await users_like_musics.findOne({
            where: {
                user,
                music,
            },
        });

        if (!isLiked) {
            return res
                .status(400)
                .json({ Error: 'U dont like this music to remove ur like ' });
        }

        await users_like_musics.destroy({
            where: {
                user,
                music,
            },
            limit: 1,
        });

        return res.json({ message: 'Like Removed with success! ' });
    },
};
