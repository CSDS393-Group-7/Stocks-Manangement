'use strict'

require('dotenv').config();

const db = require('../database');

class Stocks {
    static async getTopMentionedStocksSubreddit() {
        console.log("I'm heree");
        const data = await db.collection(process.env.STOCKS_FREQUENCY_COLLECTION).aggregate([
            {'$sort': {'day': -1}},
            {'$limit': 10}]).toArray();
        let array = data.map((stock, index, data) => {
            return stock["_id"]
        })
        return array;
    }

    static async getTopMentionedWallStreetBetsSubreddit() {
        const data = await db.collection(process.env.WALLSTREETBETS_FREQUENCY_COLLECTION).aggregate([
            {'$sort': {'day': -1}},
            {'$limit': 10}]).toArray();
        let array = data.map((stock, index, data) => {
            return stock["_id"]
        })
        return array;
    }

    static async getStockName(code) {
        const data = await db.collection(process.env.STOCK_INFO).findOne({'symbol':code})
        const name = data["name"];
        return name;
    }

    static async getVolume(stocks) {
        let sendData = {}
        for(const stock of stocks) {
            const data = await db.collection(process.env.VOLUME).findOne({_id: stock});
            sendData[stock] = data["volume"];
        }
        return sendData;
    }

    static async getNameList(stocks) {
        let sendData = {}
        for(const stock of stocks) {
            const data = await db.collection(process.env.STOCK_INFO).findOne({'symbol': stock});
            sendData[stock] = data["name"];
        }
        return sendData;
    }
}

module.exports = Stocks;