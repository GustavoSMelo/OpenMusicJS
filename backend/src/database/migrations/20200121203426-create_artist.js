'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('artists', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            name_artistic: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },

        });
    },

    down: queryInterface => {
        return queryInterface.dropTable('artists');
    },
};
