const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const authMiddleware = require('../app/middlewares/auth/authMiddleware');
const ArtistController = require('../app/controllers/ArtistController');
const ArtSessionController = require('../app/controllers/ArtSessionController');
const multer = require('multer');
const multerConfig = require('../config/uploads/multer');
const MusicController = require('../app/controllers/MusicController');

const upload = multer(multerConfig);

//routes of user
routes.post('/user', upload.single('avatar'), UserController.store);
routes.get('/user', UserController.index);
routes.delete('/user', authMiddleware, UserController.destroy);
routes.post('/login/user', SessionController.store);
routes.put(
    '/user',
    authMiddleware,
    upload.single('avatar'),
    UserController.update
);
routes.post('/files', upload.single('avatar'), (req, res) => {
    return res.json(req.file);
});

//routes of artist
routes.post('/artist', upload.single('avatar'), ArtistController.store);
routes.get('/artist', ArtistController.index);
routes.delete('/artist', authMiddleware, ArtistController.destroy);
routes.put(
    '/artist',
    authMiddleware,
    upload.single('avatar'),
    ArtistController.update
);
routes.post('/login/artist', ArtSessionController.store);

//routes of musics
routes.post(
    '/music',
    authMiddleware,
    upload.array('info', 2),
    MusicController.store
);
routes.get('/musics', MusicController.index);

module.exports = routes;
