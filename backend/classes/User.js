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

    async getQuery(stock) {
        return await db.collection(process.env.USER_COLLECTION).findOne({ 
            username: this.username, 
            "watchlist.stock" : stock
        });
    }

    getCurrentStockInfo(query, target) {
        const stockList = query.watchlist;
        for(let i = 0; i < stockList.length; i++) {
            const name = stockList[i].stock;
            if(name == target) {
                return stockList[i];
            }
        }
        return null;
    }

    async insertNewStockToWatchList(data) {
        const stockName = data.stock;
        const existed = !!await this.getQuery(stockName);
        if(existed) {
            console.log(existed)
            const query = await this.getQuery(stockName);
            
            const current = this.getCurrentStockInfo(query, stockName);
            
            const newQuantity = parseFloat(data.quantity);
            const newPrice = parseFloat(data.price);
            
            const currentTotal = parseFloat(current.price) * parseFloat(current.quantity);
            const newTotal = newQuantity * newPrice;
            
            const newAverage = (currentTotal + newTotal) / (current.quantity + newQuantity);
            const result =  await db.collection(process.env.USER_COLLECTION).findOneAndUpdate(
               { username: this.username, "watchlist.stock" : stockName},
               {"$inc": {"watchlist.$.quantity" : newQuantity}, 
               "$set": {"watchlist.$.price": newAverage}},
               {returnOriginal: false}
            );
            
            return this.getCurrentStockInfo(result.value, stockName)
        }
        
        else {
            const result = await db.collection(process.env.USER_COLLECTION).findOneAndUpdate(
                { username: this.username},
                { $push: { watchlist: data}},
            )
            return data;
        }
        
    }
};

module.exports = User;