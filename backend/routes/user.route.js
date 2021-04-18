'use strict'

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');

const User = require('../classes/User');

router.post('/create', async (req, res) => {
    const username = req.body.username;
    const rawPwd = req.body.password;

    if (User.ifExists(username)) 
        res.sendStatus(409);

    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(rawPwd, salt);
    
    User.createNewUser(req.body.username, hashedPwd, req.body.fullName, req.body.email);

    res.send(jwt.sign(
        username, 
        process.env.TOKEN_SECRET, 
        { expiresIn: '1000m' }
    ));
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const rawPwd = req.body.password;

    const user = new User(username);

    if (!(await user.ifExists())) 
        res.sendStatus(404);
    
    const storedPwd = await user.getPwdFromDb();
    const matched = bcrypt.compareSync(rawPwd, storedPwd);
    if (matched)
        res.send(jwt.sign(
            username,
            process.env.TOKEN_SECRET,
            { expiresIn: '1000m' }
        ));
    else
        res.sendStatus(403);
});

module.exports = router;