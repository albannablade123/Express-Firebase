'use strict';
const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const config = ('./config');

const app = express();

//MiddleWares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () => console.log('App is listening on url http://localhost' + config.port));
