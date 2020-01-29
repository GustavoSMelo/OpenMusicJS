const { DataTypes, Model } = require('sequelize');

class users_like_musics extends Model {
    static init(connection) {
        super.init(
            {
                user: DataTypes.INTEGER,
                music: DataTypes.INTEGER,
            },
            { sequelize: connection }
        );
    }
}

module.exports = users_like_musics;
