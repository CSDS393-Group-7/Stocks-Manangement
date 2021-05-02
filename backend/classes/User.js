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
            watchlist: []
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
    
    async getFullName() {
        return (await db.collection(process.env.USER_COLLECTION).findOne({ username: this.username })).fullName;
    }

    async getEmail() {
        return (await db.collection(process.env.USER_COLLECTION).findOne({ username: this.username })).email;
    }

    async getWatchlist() {
        return (await db.collection(process.env.USER_COLLECTION).findOne({ username: this.username})).watchlist;
    }

    async existedStock(stock) {
        return await db.collection(process.env.USER_COLLECTION).findOne({ 
            username: this.username, 
            "watchlist.stock" : stock
        });
    }
    async insertNewStockToWatchList(data) {
        const existed = !!await this.existedStock(data.stock);
        const newQuantity = parseInt(data.quantity);
        if(existed) {
           return await db.collection(process.env.USER_COLLECTION).updateOne(
               { username: this.username, "watchlist.stock" : data.stock},
               {"$inc": {"watchlist.$.quantity" : newQuantity}}
           ); 
        }
        else {
            return (await db.collection(process.env.USER_COLLECTION).updateOne(
                { username: this.username},
                { $push: { watchlist: data}}
            ));
        }
    }
};

module.exports = User;