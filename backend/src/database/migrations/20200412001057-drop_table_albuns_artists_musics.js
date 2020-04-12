'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('artist_albuns_musics');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.createTable('artist_albuns_musics', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            album: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'albuns',
                },
            },

            music: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'musics',
                },
            },

            artists: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'musics',
                },
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },
};
