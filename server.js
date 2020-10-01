const express = require('express')

const traccar = require('./controllers/traccar');

const app = express()
const port = process.env.PORT || 8081;

require('dotenv').config();

const helmet = require('helmet')
app.use(helmet())

// Traccar app
app.post('/', traccar);

app.listen(port, () => console.log(`Traccar Application to Thingsboard gateway running on port ${port}!`))
