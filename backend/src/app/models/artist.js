const { DataTypes, Model } = require('sequelize');

class Artist extends Model {
    static init(connection) {
        super.init(
            {
                name: DataTypes.STRING,
                name_artistic: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                avatar: DataTypes.STRING,
            },
            { sequelize: connection }
        );
    }
}

module.exports = Artist;
