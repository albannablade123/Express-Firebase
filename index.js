'use strict';
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/student-routes');

const bodyParser = require('body-parser');
const config = require('./config');



const app = express();

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/api', studentRoutes.routes);

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
