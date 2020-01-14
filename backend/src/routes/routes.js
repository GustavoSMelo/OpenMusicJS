const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const authMiddleware = require('../app/middlewares/auth/authMiddleware');

routes.post('/user', UserController.store);
routes.get('/user', UserController.index);
routes.delete('/user', authMiddleware, UserController.destroy);
routes.post('/login', SessionController.store);

module.exports = routes;
