'use strict'

const express = require('express');
const cors = require('cors');

const user = require('../routes/user.route');
const news = require('../routes/news.route');

const rest_app = express();

rest_app.use(express.json());
rest_app.use(cors());
rest_app.use(express.urlencoded({ extended: true }));

rest_app.use('/api/user', user);
rest_app.use('/api/news', news);

module.exports = rest_app