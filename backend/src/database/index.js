const Sequelize = require('sequelize');
const dbConfig = require('../config/sql/config');
const UserModel = require('../app/models/user');

const connection = new Sequelize(dbConfig);
UserModel.init(connection);

module.exports = connection;
