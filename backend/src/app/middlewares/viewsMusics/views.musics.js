const ViewsMusics = require('../../models/views.musics');
const MusicModel = require('../../models/music');

module.exports = async (req, res, next) => {
    const music = req.headers.musicid;

    if (!music) {
        return res.status(400).json({ Error: 'Music ID didnt send ' });
    }

    console.log(music);

    const musicExists = await MusicModel.findOne({ where: { id: music } });

    if (!musicExists) {
        return res.status(404).json({ Error: 'Music not exists in database ' });
    }

    const isViewsExists = await ViewsMusics.findOne({ music });

    if (!isViewsExists) {
        await ViewsMusics.create({
            qtd_views: 1,
            music,
            date: Date.now(),
        });
    } else {
        const { qtd_views: views } = isViewsExists;
        await isViewsExists.update({
            qtd_views: views + 1,
            music,
            date: Date.now(),
        });
    }

    return next();
};
