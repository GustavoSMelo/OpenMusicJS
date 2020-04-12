const Albuns = require('../models/albuns');
const AuthMethod = require('../../utils/authMethod');

module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({ Error: 'Token didnt sended ' });
        }

        const { id: artist } = await AuthMethod(authHeader);

        if (!artist) {
            return res.json({ Error: 'Token didnt sended ' });
        }

        const { name, genre, year_lunched, description = null } = req.body;

        if (!name || !genre || !year_lunched) {
            return res
                .status(400)
                .json({ Error: 'Please, to continue, insert all the fields ' });
        }

        const { filename: banner } = req.file;

        if (!banner) {
            return res.status(400).json({
                Error:
                    'Error to receive the banner, please, insert the banner ',
            });
        }

        try {
            const hasAlbuns = await Albuns.findOne({
                where: {
                    name,
                },
            });

            if (hasAlbuns) {
                return res
                    .status(400)
                    .json({ Error: 'already exists album with this name ' });
            }

            await Albuns.create({
                name,
                genre,
                year_lunched,
                description,
                banner,
                artist,
            });

            return res.json({ message: 'Success to create album ' });
        } catch (err) {
            return res.json({ Error: `Error to create album \n ${err} ` });
        }
    },

    async index(req, res) {
        const albuns = await Albuns.findAll();

        if (!albuns || albuns.length <= 0) {
            return res
                .status(404)
                .json({ Error: 'Any album finded in database ' });
        }

        return res.json(albuns);
    },

    async delete(req, res) {
        const authHeader = req.headers.authorization;

        const { id: artist } = await AuthMethod(authHeader);

        if (!artist) {
            return res.status(400).json({ Error: 'Token didnt sended ' });
        }

        const { album: id } = req.body;

        if (!id) {
            return res.status(400).json({ Error: 'Number of didnt send ' });
        }

        const isOwner = await Albuns.findOne({
            where: {
                id,
                artist,
            },
        });

        if (!isOwner) {
            return res.status(401).json({
                Error:
                    'U isnt authorized to do this action or Album didnt find ',
            });
        }

        await Albuns.destroy({
            where: {
                id,
                artist,
            },
            limit: 1,
        });

        return res.json({ message: 'Album deleted with success! ' });
    },

    async update(req, res) {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(400).json({ Error: 'Token didnt send ' });
        }

        const { id: artist } = await AuthMethod(authHeader);

        if (!artist) {
            return res.status(400).json({ Error: 'Token invalid ' });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ Error: 'Id didnt send ' });
        }

        const hasAlbum = await Albuns.findOne({
            where: {
                artist,
                id,
            },
        });

        if (!hasAlbum) {
            return res
                .status(404)
                .json({ Error: 'Sorry, but this album doenst exist ' });
        }

        const {
            name = hasAlbum.name,
            year_lunched = hasAlbum.year_lunched,
            description = hasAlbum.description,
        } = req.body;

        try {
            let { filename: banner = hasAlbum.banner } = req.file;

            await Albuns.update(
                { name, banner, year_lunched, description, artist },
                { where: { id, artist } }
            );

            return res.json({ message: 'Success to update album ' });
        } catch (err) {
            return res.status(400).json({ Error: `Image not found ${err}` });
        }
    },

    async show(req, res) {
        const { album: id } = req.headers;

        const infoAlbum = await Albuns.findOne({
            where: {
                id,
            },
        });

        return res.json({ infoAlbum });
    },
};
