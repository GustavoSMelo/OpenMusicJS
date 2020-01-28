'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.changeColumn(
            'artist_albuns_musics',
            'updated_at',
            { type: Sequelize.DATE, allowNull: false }
        );
    },

    down: queryInterface => {
        return queryInterface.changeColumn(
            'artist_albuns_musics',
            'updated_at',
            { type: Sequelize.INTEGER, allowNull: false }
        );
    },
};
