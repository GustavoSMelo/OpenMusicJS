'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users_like_albuns', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },

            album: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'albuns',
                    key: 'id',
                },
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('users_like_albuns');
    },
};
