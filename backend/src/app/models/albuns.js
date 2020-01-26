const { DataTypes, Model } = require('sequelize');

class Albuns extends Model {
    static init(connection) {
        super.init(
            {
                name: DataTypes.STRING,
                banner: DataTypes.STRING,
                genre: DataTypes.STRING,
                year_lunched: DataTypes.DATE,
                description: DataTypes.TEXT,
            },
            { sequelize: connection }
        );
    }
}

module.exports = Albuns;
