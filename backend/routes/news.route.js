'use strict'

require('dotenv').config();
const express = require('express');
const { pullDataFromProviders } = require('../classes/News');
const router = express.Router();

const News = require('../classes/News');

router.get('/pull-trigger', async (req, res) => {
    console.log('Manually trigger pulling news');
    await pullDataFromProviders();
    res.json('Successfully pulled');
});

router.get('/get-list', async (req, res) => {
    res.json(await News.getNewsList());
});

router.post('/search', async (req, res) => {
    const keywords = req.body.keywords.replace(",", " ");
    if (keywords.trim().length === 0)
        return res.json(await News.getNewsList());
    res.json(await News.search(keywords));
});

if (Number(process.env.ENABLE_AUTO_PULLING)) {
    console.log('Setting to auto pull news data');
    setInterval(News.pullDataFromProviders, 1800000);
}

module.exports = router;