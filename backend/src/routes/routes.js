const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const authMiddleware = require('../app/middlewares/auth/authMiddleware');
const ArtistController = require('../app/controllers/ArtistController');
const ArtSessionController = require('../app/controllers/ArtSessionController');

//routes of user
routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.delete('/user', authMiddleware, UserController.destroy);
routes.post('/login/user', SessionController.store);
routes.put('/user', authMiddleware, UserController.update);

//routes of artist
routes.post('/artist', ArtistController.store);
routes.get('/artist', ArtistController.index);
routes.delete('/artist', authMiddleware, ArtistController.destroy);
routes.put('/artist', authMiddleware, ArtistController.update);
routes.post('/login/artist', ArtSessionController.store);

module.exports = routes;
