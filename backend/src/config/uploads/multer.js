const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            if (extname(file.originalname) === '.mp3') {
                return cb(
                    null,
                    resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'tmp',
                        'uploads',
                        'music'
                    )
                );
            }

            return cb(
                null,
                resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', 'img')
            );
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return cb(err);
                }

                return cb(
                    null,
                    buf.toString('hex') + extname(file.originalname)
                );
            });
        },
    }),
};
