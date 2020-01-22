const Sequelize = require('sequelize');
const dbConfig = require('../config/sql/config');
const UserModel = require('../app/models/user');
const ArtistModel = require('../app/models/artist');

const connection = new Sequelize(dbConfig);
UserModel.init(connection);
ArtistModel.init(connection);

module.exports = connection;
