'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
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
                    model: 'artists',
                },
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('artist_albuns_musics');
    },
};
