const musics = require('../models/music');
const authMethod = require('../../utils/authMethod');

module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        const { id: singer } = await authMethod(authHeader);

        const [banner, music] = req.files;

        if (!banner || !music) {
            return res.status(400).json({ Error: 'Some archive is missing ' });
        }
        const { name = music.originalname, genre } = req.body;

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
            return res.status(404).json({
                Error: 'Any music did registre or finded in database ',
            });
        }

        return res.json(allmusics);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const info = await authMethod(authHeader);

        if (!info || info.length <= 0) {
            return res.status(401).json({ Error: 'Token inst confirmed ' });
        }

        const { id: idArtist } = info;

        const { name, id } = req.body;

        if (!name || !id) {
            return res.status(400).json({
                Error: 'Please, complete all the fields to continue ',
            });
        }

        const musicfinded = await musics.findOne({
            where: {
                id,
            },
        });

        if (!musicfinded) {
            return res
                .status(404)
                .json({ Error: 'Music not found in we database ' });
        }

        if (name !== musicfinded.name) {
            return res
                .status(401)
                .json({ Error: 'Id and name of music dont match ' });
        }

        if (idArtist !== musicfinded.singer) {
            return res
                .status(401)
                .json({ Error: 'Your account inst owner this music ' });
        }

        await musics.destroy({ where: { id }, limit: 1 });

        return res.json({ message: 'Music deleted with success! ' });
    },

    async update(req, res) {
        const authHeader = req.headers.authorization;

        const info = await authMethod(authHeader);

        if (!info || info.length <= 0) {
            return res.status(401).json({ Error: 'Token inst confirmed ' });
        }

        const { id: idArtist } = info;

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ Error: 'Id not sended ' });
        }

        const musicfinded = await musics.findOne({ where: { id } });

        if (!musicfinded) {
            return res
                .status(404)
                .json({ Error: 'Any music finded with this id ' });
        }

        if (idArtist !== musicfinded.singer) {
            return res
                .status(401)
                .json({ Error: 'Your account inst owner this music ' });
        }

        const {
            oldname = musicfinded.name,
            newname: name,
            genre = musicfinded.genre,
            singer = musicfinded.singer,
        } = req.body;

        if (!oldname || !name || !genre || !singer) {
            return res.status(400).json({
                Error: 'Please, complete all the fields to continue ',
            });
        }

        if (oldname !== musicfinded.name) {
            return res
                .status(404)
                .json({ Error: 'oldname of music isnt valid ' });
        }

        try {
            await musics.update(
                { oldname, name, genre, singer },
                { where: { id }, limit: 1 }
            );

            return res.json({ message: 'Music updated with success ' });
        } catch (err) {
            return res.status(500).json({
                Error: `Ops, we have some error in server, please try to update again \n${err}`,
            });
        }
    },
};
