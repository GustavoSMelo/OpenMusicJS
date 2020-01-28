const Sequelize = require('sequelize');
const dbConfig = require('../config/sql/config');
const UserModel = require('../app/models/user');
const ArtistModel = require('../app/models/artist');
const MusicModel = require('../app/models/music');
const AlbunsModel = require('../app/models/albuns');
const RelationshipAAM = require('../app/models/relationship_album_music_artist');

//connections
const connection = new Sequelize(dbConfig);
UserModel.init(connection);
ArtistModel.init(connection);
MusicModel.init(connection);
AlbunsModel.init(connection);
RelationshipAAM.init(connection);

//relationship
MusicModel.belongsTo(ArtistModel, { foreignKey: 'singer' });
AlbunsModel.belongsTo(ArtistModel, { foreignKey: 'artist' });
RelationshipAAM.belongsTo(ArtistModel, { foreignKey: 'artists' });
RelationshipAAM.belongsTo(MusicModel, { foreignKey: 'music' });
RelationshipAAM.belongsTo(AlbunsModel, { foreignKey: 'album' });

module.exports = connection;
