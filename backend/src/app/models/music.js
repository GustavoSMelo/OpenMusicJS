const { DataTypes, Model } = require('sequelize');
const Artist = require('./artist');

class Musics extends Model {
    static init(connection) {
        super.init(
            {
                name: DataTypes.STRING,
                path: DataTypes.STRING,
                genre: DataTypes.STRING,
                singer: DataTypes.INTEGER,
                banner_path: DataTypes.STRING,
            },
            { sequelize: connection }
        );
    }
}

module.exports = Musics;
