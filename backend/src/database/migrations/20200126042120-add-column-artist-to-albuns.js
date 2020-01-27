'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('albuns', 'artist', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'artists', key: 'id' },
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('albuns', 'artist');
    },
};
