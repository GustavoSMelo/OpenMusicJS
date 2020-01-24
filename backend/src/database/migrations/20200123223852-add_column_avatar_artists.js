'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('artists', 'avatar', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('artists', 'avatar');
    },
};
