'use strict'

require('dotenv').config();
const fetch = require('node-fetch');

const db = require('../database');

class News {
    static async pullDataFromProviders() {
        const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list';
        fetch(url, { 
            method: "POST",
            headers: {
                "x-rapidapi-key": process.env.YAHOO_FIN_APIKEY,
                "x-rapidapi-host": process.env.YAHOO_FIN_HOST
            }
        })
        .then(res => res.json())
        .then(data => data['data']['main']['stream'])
        .then(newsList => {
            newsList.forEach(news => {
                const content = news['content'];

                const insertData = {
                    title: content['title'],
                    contentType: content['contentType'],
                    thumbnailUrl: content['thumbnail']['resolutions'].slice(-1)['url'],
                    originalUrl: content['clickThroughUrl']['url'],
                    provider: content['provider']['displayName'],
                    publicationDate: content['pubDate'];
                };

                db.collection('news').insertOne(insertData);
            });
        });
    }
};

module.exports = News;