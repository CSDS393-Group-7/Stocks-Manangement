'use strict'

const express = require('express');
const cors = require('cors');
const db = require('./database');
require('dotenv').config();
const app = express();

const port = 8000;
const socketPort = 3080;

db.connect(process.env.DATABASE, (err) => {
    if (err)
        throw err;

    const rest_app = require('./server/rest_server.js');
    const socket_app = require('./server/socket_server.js');
    const Price = require('./classes/Price.js');

    const server = rest_app.listen(port, () => {
        console.log(`Successfully started server! Listening at port ${port}`);
    });

    const socketServer = socket_app.listen(socketPort, () => {
        console.log(`Sucessfully started socket server! Listening at port ${socketPort}`)
    })
    Price.startSocket(socketServer, db)
});