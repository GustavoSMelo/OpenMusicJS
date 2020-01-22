const express = require('express');
const app = express();
const routes = require('./routes/routes');
const cors = require('cors');
require('./database/index');

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = 3333;
app.listen(PORT, () =>
    console.log('Server is running in http://localhost:3333 ')
);