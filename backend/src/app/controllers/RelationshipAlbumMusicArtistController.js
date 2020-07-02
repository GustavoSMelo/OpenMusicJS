const authMethod = require('../../utils/authMethod');
const Musics = require('../models/music');
const Albuns = require('../models/albuns');
const RelationshipAAM = require('../models/relationship_album_music_artist');
module.exports = {
    async store(req, res) {
        const authHeader = req.headers.authorization;

        const { id: artists } = await authMethod(authHeader);

        const { music } = req.body; //id Music

        if (!music) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const isOwnerMusic = await Musics.findOne({
            where: {
                id: music,
                singer: artists,
            },
        });

        if (!isOwnerMusic) {
            return res
                .status(401)
                .json({ Error: 'U isnt authorized to do this action ' });
        }

        const { album } = req.body;

        if (!album) {
            return res
                .status(400)
                .json({ Error: 'Please, insert all fields to continue ' });
        }

        const isOwnerAlbum = await Albuns.findOne({
            where: {
                id: album,
                artist: artists,
            },
        });

        if (!isOwnerAlbum) {
            return res
                .status(401)
                .json({ Error: 'U isnt authorized to do this action ' });
        }

        const isExists = await RelationshipAAM.findOne({
            where: {
                artists,
                album,
                music,
            },
        });

        if (isExists) {
            return res
                .status(400)
                .json({ Error: 'Music already inserted in album ' });
        }

        await RelationshipAAM.create({ music, album, artists });

        return res.json({
            message: 'Success to insert a music inside of album ',
        });
    },

    async index(req, res) {
        const albuns = await RelationshipAAM.findAll();
        if (!albuns || albuns.length <= 0) {
            return res.json({ Error: 'Relationship didnt found ' });
        }

        return res.json(albuns);
    },

    async destroy(req, res) {
        const authHeader = req.headers.authorization;

        const { id: artists } = await authMethod(authHeader);

        const { album, music } = req.headers;

        try {
            await RelationshipAAM.destroy({
                where: {
                    artists,
                    album,
                    music,
                },
            });
        } catch (err) {
            return res.status(401).json({
                Error: `Error in delete music inside album, please try again,\n ${err}`,
            });
        }
    },

    async update(req, res) {
        const authHeader = req.headers.authorization;

        const { id: artist } = await authMethod(authHeader);

        const { album } = req.body;
        if (!album) {
            return res
                .status(400)
                .json({ Error: 'Please, insert what album u want do delete ' });
        }

        const hasAlbum = await Albuns.findOne({ where: { id: album } });

        if (!hasAlbum) {
            return req.status(404).json({ Error: 'This album doesnt exists ' });
        }

        const isInserted = await Albuns.findOne({
            where: { id: album, artist },
        });

        if (!isInserted) {
            return res
                .status(401)
                .json({ Error: 'U isnt authorized to do this action ' });
        }

        const isOnwner = await RelationshipAAM.findOne({
            where: {
                album,
                artists: artist,
            },
        });

        const { id } = isOnwner;

        if (!isOwner) {
            return res.status(401).json({
                Error:
                    'U isnt authorized to do this or the album didnt finded ',
            });
        }

        const { music = isOnwner.music } = req.body;

        if (!music) {
            return res.status(400).json({ Error: 'id of music didnt send ' });
        }

        const isOwnerOfMusic = await Musics.findOne({
            where: {
                id: music,
                singer: artist,
            },
        });

        if (!isOwnerOfMusic) {
            return res
                .status(401)
                .json({ Error: 'U isnt owner of this music ' });
        }

        await RelationshipAAM.update(
            { music, artists: artist, album },
            { where: { id }, limit: 1 }
        );

        return res.json({ message: 'Success to update album of musics ' });
    },

    async show(req, res) {
        const { albumID: album } = req.body;
        console.log(album);
        const infoAlbum = await RelationshipAAM.findAll({
            where: {
                album,
            },
        });

        return res.json({ infoAlbum });
    },
};
