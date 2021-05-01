'use strict'

const express = require('express');
const router = express.Router();
const User = require('../classes/User');
const Stocks = require('../classes/Stocks');
const auth = require('../middleware/auth');
const db = require('../database');

router.post('/addStock', auth.authenticateToken, async (req, res) => {
    const data = req.body;
    const user = new User(req.username);
    await user.insertNewStockToWatchList(data);
    res.send(200);
});

router.get('/topMentionedStocksSub', async (req, res) => {
    try {
        const data = await Stocks.getTopMentionedStocksSubreddit();
        res.statusCode = 200;
        res.send(data);
    }
    catch(error) {
        res.status = 400;
        res.send("Some errors occurred.");
    }
})

router.get('/topMentionedWallStreetSub', async (req, res) => {
    try {
        const data = await Stocks.getTopMentionedWallStreetBetsSubreddit();
        res.statusCode = 200;
        res.send(data);
    }
    catch(error) {
        res.status = 400;
        res.send("Some errors occurred.");
    }
    
})

module.exports = router;


