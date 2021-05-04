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
})

module.exports = router;
