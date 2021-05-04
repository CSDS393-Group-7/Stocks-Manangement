'use strict'
require('dotenv').config();

const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
    console.log("Req for authenticate Token is "+req);
    const authHeader = req.headers['authorization'];
    const jwtToken = authHeader && authHeader.split(' ')[1];    // Choose the part after BEARER
    
    if (jwtToken === undefined)
        return res.status(401).json('Unauthorized. No token found');
    
    jwt.verify(jwtToken, TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(403).json('Request forbidden');
        
        req.username = user
        next();
    });
};

module.exports = {
    authenticateToken: authenticateToken,
};