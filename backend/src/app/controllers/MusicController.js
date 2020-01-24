const musics = require('../models/music');

module.exports = {
    async store(req, res) {
        const [banner, music] = req.files;

        if (!banner || !music) {
            return res.status(400).json({ Error: 'Some archive is missing ' });
        }
        const { name = music.originalname, genre, singer } = req.body;

        const musicNameExists = await musics.findOne({
            where: {
                name: name,
            },
        });

        if (musicNameExists) {
            return res
                .status(400)
                .json({ Error: 'Music already exists in database ' });
        }

        if (!genre || !singer || !name) {
            return res
                .status(400)
                .json({ Error: 'Some informations of any field is missing ' });
        }

        await musics.create({
            name,
            genre,
            singer,
            banner_path: banner.filename,
            path: music.filename,
        });

        return res.json({ message: 'Music registred with success! :) ' });
    },

    async index(req, res) {
        const allmusics = await musics.findAll();

        if (!allmusics || allmusics.length <= 0) {
            return res
                .status(404)
                .json({
                    Error: 'Any music did registre or finded in database ',
                });
        }

        return res.json(allmusics);
    },
};
