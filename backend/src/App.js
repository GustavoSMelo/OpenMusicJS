const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');
require('./database/index');

app.use(express.static(path.resolve(__dirname, '../tmp/uploads')));

app.use(cors());
app.use(express.json({ limit: '512mb' }));
app.use(express.urlencoded({ extended: true, limit: '512mb' }));
app.use('/', routes);

const PORT = 3333;
app.listen(PORT, () =>
    console.log('Server is running in http://localhost:3333 ')
);
