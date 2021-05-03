'use strict'

const express = require('express');
const router = express.Router();
const User = require('../classes/User');
const Stocks = require('../classes/Stocks');
const auth = require('../middleware/auth');

router.post('/addStock', auth.authenticateToken, async (req, res) => {
    const data = req.body;
    const user = new User(req.username);
    const result = await user.insertNewStockToWatchList(data);
    res.status = 200;
    res.json(result);
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


