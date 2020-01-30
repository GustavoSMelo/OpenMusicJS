const mongoose = require('../../config/mongodb/connection');

const Views = mongoose.Schema({
    qtd_views: Number,
    music: Number,
    date: Date,
});

mongoose.model('views_musics', Views);

const views = mongoose.model('views_musics');

module.exports = views;
