'use strict'

const express = require('express');
const cors = require('cors');

const user = require('../routes/user.route');
const news = require('../routes/news.route');
const stocks = require('../routes/stock.route');
const price = require('../routes/price.route');
const rest_app = express();

rest_app.use(express.json());
rest_app.use(cors());
rest_app.use(express.urlencoded({ extended: true }));

rest_app.use('/api/user', user);
rest_app.use('/api/news', news);
rest_app.use('/api/stock', stocks);
rest_app.use('/api/price', price);
module.exports = rest_app