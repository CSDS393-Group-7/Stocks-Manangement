'use strict'

require('dotenv').config();
const db = require('../database');

class User {   
    static createNewUser(username, hashPwd, fullName, email) {
        db.collection(process.env.USER_COLLECTION).insertOne({
            username: username,
            password: hashPwd,
            fullName: fullName,
            email: email,
        });
    };

    constructor(username) {
        this.username = username;
    }

    async ifExists() {
        return (await db.collection(process.env.USER_COLLECTION).findOne({ username: this.username })) !== null;
    }

    async getPwdFromDb() {
        return (await db.collection(process.env.USER_COLLECTION).findOne({ username: this.username })).password;
    }
};

module.exports = User;