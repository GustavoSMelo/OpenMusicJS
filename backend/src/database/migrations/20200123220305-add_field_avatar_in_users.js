'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'avatar', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },

    down: queryInterface => {
        return queryInterface.removeColumn('users', 'avatar');
    },
};
