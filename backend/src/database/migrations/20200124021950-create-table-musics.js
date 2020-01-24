'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('musics', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },

            name: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },

            path: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            genre: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            singer: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },

            banner_path: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('musics');
    },
};
