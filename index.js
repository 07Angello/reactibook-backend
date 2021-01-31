const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/routes');

app.use( cors() );
app.use( router );

app.listen(4000, () => {
    console.log('Server running on port 4000')
});