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

router.post('/stockName', async (req,res) => {
    const stock = req.body["stock"];
    const name = await Stocks.getStockName(stock);
    res.status(200);
    res.json({
        name: name
    });
})

router.get('/topMentionedStocksSub', async (req, res) => {
    console.log("Enter router top mentioned");
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

router.post('/volume', async(req, res) =>{
    try {
        const code = req.body["stock"];
        const data = await Stocks.getVolume(code);
        res.statusCode = 200;
        res.send(data);
    }
    catch(error) {
        res.statusCode = 400;
        res.send("Some errors occurred.");
    }
})

router.post('/nameList', async(req, res) => {
    try {
        const code = req.body["stock"];
        const data = await Stocks.getNameList(code);
        res.statusCode = 200;
        res.send(data);
    }
    catch(error) {
        res.statusCode = 400;
        res.send("Some errors occurred.");
    }
})
module.exports = router;


