const { DataTypes, Model } = require('sequelize');

class artist_albuns_musics extends Model {
    static init(connection) {
        super.init(
            {
                album: DataTypes.INTEGER,
                music: DataTypes.INTEGER,
                artists: DataTypes.INTEGER,
            },
            { sequelize: connection }
        );
    }
}

module.exports = artist_albuns_musics;
