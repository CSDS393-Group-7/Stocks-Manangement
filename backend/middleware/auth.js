'use strict'

require('dotenv').config();

const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader && authHeader.split(' ')[1];    // Choose the part after BEARER
    
    if (token === null)
        return res.sendStatus(401);
    
    jwt.verify(jwtToken, TOKEN_SECRET, (err, user) => {
        if (err)
            return res.sendStatus(403);
        
        req.user = user
        next();
    });
};

module.exports = {
    authenticateToken: authenticateToken,
};