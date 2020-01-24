const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                avatar: DataTypes.STRING,
            },
            {
                sequelize: connection,
            }
        );
    }
}

module.exports = User;
