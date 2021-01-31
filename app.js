const express = require('express');
// db
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/routes');

//db

app.use( cors() );
app.use( express.json() );

app.use( routes );

module.exports = app;