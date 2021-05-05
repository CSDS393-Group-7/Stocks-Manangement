'use strict'

const express = require('express');
const router = express.Router();
const User = require('../classes/User');
const Price = require('../classes/Price');
const auth = require('../middleware/auth');

router.post("/stockPrice", async (req, res) => {
    const stockList = req.body.list;
    const result = await Price.getStockPrice(stockList);
    res.status = 200;
    res.json(result);
});

router.post("/specificStockPrice", async (req, res) => {
    const code = req.body["stock"];
    const price = await Price.getSpecificStockPrice(code);
    res.status = 200;
    res.json({
        price: price
    });
});
module.exports = router;
