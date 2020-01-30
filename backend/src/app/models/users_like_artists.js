const { DataTypes, Model } = require('sequelize');

class users_like_artists extends Model {
    static init(connection) {
        super.init(
            {
                user: DataTypes.INTEGER,
                artist: DataTypes.INTEGER,
            },
            { sequelize: connection }
        );
    }
}

module.exports = users_like_artists;
