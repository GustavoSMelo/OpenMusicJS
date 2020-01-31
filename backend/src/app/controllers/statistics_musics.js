const music = require('../models/music');
const statistic_musics = require('../models/statistic_musics');
const views_musics = require('../models/views.musics');
const authMethod = require('../../utils/authMethod');

module.exports = {
    async store(req, res) {
        const { musicid } = req.headers;

        const { singer: artist } = await music.findOne({
            where: {
                id: musicid,
            },
        });

        const {
            qtd_views,
            date: last_date_updated,
        } = await views_musics.findOne({ music: musicid });

        try {
            await statistic_musics.create({
                music: musicid,
                artist,
                qtd_views,
                last_date_updated,
            });
        } catch (err) {
            return res.status(500).json({
                Error:
                    'we has problem to register informations of your music, please, try again ',
            });
        }

        return res.json({ message: 'Informations registred with success! ' });
    },

    async index(req, res) {
        const { musicid: music } = req.headers;

        const authHeader = req.headers.authorization;

        const { id: artist } = await authMethod(authHeader);

        const info = await statistic_musics.findAll({
            where: { music, artist },
        });

        if (!info || info.length <= 0) {
            return res
                .status(204)
                .json({ Error: 'Any statistic of this music is received ' });
        }

        return res.json(info);
    },
};
