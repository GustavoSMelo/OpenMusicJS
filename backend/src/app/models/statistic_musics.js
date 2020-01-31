const { DataTypes, Model } = require('sequelize');

class statistic_musics extends Model {
    static init(connection) {
        super.init(
            {
                last_date_update: DataTypes.DATE,
                music: DataTypes.INTEGER,
                artist: DataTypes.INTEGER,
                qtd_views: DataTypes.INTEGER,
            },
            { sequelize: connection }
        );
    }
}

module.exports = statistic_musics;
