const Sequelize = require('sequelize');
const dbConfig = require('../config/sql/config');
const UserModel = require('../app/models/user');
const ArtistModel = require('../app/models/artist');
const MusicModel = require('../app/models/music');
const AlbunsModel = require('../app/models/albuns');
const RelationshipAAM = require('../app/models/relationship_album_music_artist');
const users_like_musics_model = require('../app/models/users_like_musics');
const users_like_albuns_model = require('../app/models/users_like_albuns');

//connections
const connection = new Sequelize(dbConfig);
UserModel.init(connection);
ArtistModel.init(connection);
MusicModel.init(connection);
AlbunsModel.init(connection);
RelationshipAAM.init(connection);
users_like_musics_model.init(connection);
users_like_albuns_model.init(connection);

//relationship
MusicModel.belongsTo(ArtistModel, { foreignKey: 'singer' });
AlbunsModel.belongsTo(ArtistModel, { foreignKey: 'artist' });
RelationshipAAM.belongsTo(ArtistModel, { foreignKey: 'artists' });
RelationshipAAM.belongsTo(MusicModel, { foreignKey: 'music' });
RelationshipAAM.belongsTo(AlbunsModel, { foreignKey: 'album' });
users_like_musics_model.belongsTo(UserModel, { foreignKey: 'user' });
users_like_musics_model.belongsTo(MusicModel, { foreignKey: 'music' });
users_like_albuns_model.belongsTo(UserModel, { foreignKey: 'user' });
users_like_albuns_model.belongsTo(AlbunsModel, { foreignKey: 'albuns' });

module.exports = connection;
