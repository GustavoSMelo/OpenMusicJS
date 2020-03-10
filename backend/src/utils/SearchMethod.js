const Sequelize = require('sequelize');
const music = require('../app/models/music');
const artist = require('../app/models/artist');
const user = require('../app/models/user');
const album = require('../app/models/albuns');
const authMethod = require('./authMethod');

module.exports = {
    async index(req, res) {
        const { searchString } = req.body;

        if (!searchString) {
            return res.status(400).json({
                Error: 'Please, complete all the fields to continue ur action ',
            });
        }

        const op = Sequelize.Op;
        const info = [];

        const SearchMusic = await music.findAll({
            where: {
                name: {
                    [op.like]: `%${searchString}%`,
                },
            },
        });

        if (SearchMusic.length >= 1) {
            info.push({ Musics: SearchMusic });
        }

        const SearchArtists = await artist.findAll({
            where: {
                name_artistic: {
                    [op.like]: `%${searchString}%`,
                },
            },
        });

        if (SearchArtists.length >= 1) {
            info.push({ Artists: SearchArtists });
        }

        const SearchAlbum = await album.findAll({
            where: {
                name: {
                    [op.like]: `%${searchString}%`,
                },
            },
        });

        if (SearchAlbum.length >= 1) {
            info.push({ Albums: SearchAlbum });
        }

        const SearchUsers = await user.findAll({
            where: {
                name: {
                    [op.like]: `%${searchString}%`,
                },
            },
        });

        if (SearchUsers.length >= 1) {
            info.push({ Users: SearchUsers });
        }

        if (!info || info.length <= 0) {
            return res
                .status(404)
                .json({ Error: 'Any artist, music, album or user is finded ' });
        }

        return res.json(info);
    },

    async show(req, res) {
        const AuthToken = req.headers.Authorization;

        const info = authMethod(AuthToken);

        return res.json(info);
    },
};
