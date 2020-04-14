const Artists = require('../models/artist');
const authMethod = require('../../utils/authMethod');
const users_like_artists = require('../models/users_like_artists');
const Users = require('../models/user');

module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { artist } = req.body;

        if (!artist) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const isArtistExists = await Artists.findOne({
            where: {
                id: artist,
            },
        });

        if (!isArtistExists) {
            return res.status(400).json({ Error: 'Artists doesnt exists ' });
        }

        const isLikeExists = await users_like_artists.findOne({
            where: {
                artist,
                user,
            },
        });

        if (isLikeExists) {
            return res
                .status(400)
                .json({ Error: 'U already like this album ' });
        }

        await users_like_artists.create({ user, artist });

        return res.json({ message: 'Artist liked with success ' });
    },

    async index(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const likes = await users_like_artists.findAll({
            where: {
                user,
            },
        });

        if (!likes || likes.length <= 0) {
            return res.json([]);
        }

        const allUsers = await Users.findAll();

        res.header('CountLikes', likes.length);
        res.header('CountUsers', allUsers.length);

        return res.json(likes);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const { id: user } = await authMethod(authHeader);

        const { artist } = req.headers;

        const isArtistExists = await Artists.findOne({ where: { id: artist } });

        if (!isArtistExists) {
            return res.status(404).json({ Error: 'Artist didnt find ' });
        }

        const isLiked = await users_like_artists.findOne({
            where: {
                user,
                artist,
            },
        });

        if (!isLiked) {
            return res
                .status(400)
                .json({ Error: 'U dont like this artist to remove ur like ' });
        }

        await users_like_artists.destroy({
            where: {
                user,
                artist,
            },
            limit: 1,
        });

        return res.json({ message: 'Like Removed with success! ' });
    },

    async show(req, res) {},
};
