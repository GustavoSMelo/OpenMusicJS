'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('statistic_musics', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            last_date_update: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            music: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'musics',
                    key: 'id',
                },
            },

            artist: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'artists',
                    key: 'id',
                },
            },

            qtd_views: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable('statistic_musics');
    },
};
