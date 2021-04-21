'use strict'

const express = require('express');
const cors = require('cors');
const db = require('./database');
const auth = require('./middleware/auth');

const user = require('./routes/user.route');

const app = express();
const port = 8000;

db.connect('mongodb://localhost:27017/stock-management', (err) => {
    if (err)
        throw err;

    console.log('Successfully connected to MongoDB');
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    app.use('/api/user', user);

    app.listen(port, () => {
        console.log(`Successfully started server! Listening at port ${port}`);
    });
});