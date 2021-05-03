'use strict'

require('dotenv').config();

const db = require('../database');

class Stocks {
    static async getTopMentionedStocksSubreddit() {
        const data = await db.collection(process.env.STOCKS_FREQUENCY_COLLECTION).aggregate([
            {'$sort': {'day': -1}},
            {'$limit': 20}]).toArray();
        return data;
    }

    static async getTopMentionedWallStreetBetsSubreddit() {
        const data = await db.collection(process.env.WALLSTREETBETS_FREQUENCY_COLLECTION).aggregate([
            {'$sort': {'day': -1}},
            {'$limit': 20}]).toArray();
        return data;
    }
}

module.exports = Stocks;