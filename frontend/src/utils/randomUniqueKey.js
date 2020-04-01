import crypto from 'crypto';

const rnd = crypto.randomBytes(4).toString('HEX');

export default rnd;
