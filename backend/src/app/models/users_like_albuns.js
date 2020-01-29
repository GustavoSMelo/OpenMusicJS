const { DataTypes, Model } = require('sequelize');

class users_like_albuns extends Model {
    static init(connection) {
        super.init(
            {
                user: DataTypes.INTEGER,
                album: DataTypes.INTEGER,
            },
            { sequelize: connection }
        );
    }
}

module.exports = users_like_albuns;
