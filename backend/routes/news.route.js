'use strict'

const express = require('express');
const router = express.Router();

const News = require('../classes/News');

router.get('/test', async (req, res) => {
    // News.pullDataFromProviders();
    res.json(await News.pullDataFromProviders());
});

module.exports = router;