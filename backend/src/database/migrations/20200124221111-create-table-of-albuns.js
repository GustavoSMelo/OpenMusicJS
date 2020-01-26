'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('albuns', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },

            genre: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            banner: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            year_lunched: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
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
        return queryInterface.dropTable('albuns');
    },
};
