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

    const user = new User(username);

    if ((await user.ifExists())) {
        res.status(409).json(`${username} exists in database`);
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    console.log(salt, rawPwd);
    const hashedPwd = bcrypt.hashSync(rawPwd, salt);
    
    User.createNewUser(req.body.username, hashedPwd, req.body.fullName, req.body.email);

    res.json(jwt.sign(
        username, 
        process.env.TOKEN_SECRET,
    ));
});

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const rawPwd = req.body.password;

    const user = new User(username);

    if (!(await user.ifExists())) {
        res.status(404).json(`${username} is not found`);
        return;
    }
    
    const storedPwd = await user.getPwdFromDb();
    console.log(storedPwd);
    const matched = bcrypt.compareSync(rawPwd, storedPwd);
    if (matched)
        res.json(jwt.sign(
            username,
            process.env.TOKEN_SECRET,
        ));
    else
        res.status(403).json('Password mismatched');
});

module.exports = router;