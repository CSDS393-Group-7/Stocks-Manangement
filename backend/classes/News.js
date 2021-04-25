'use strict'

require('dotenv').config();
const fetch = require('node-fetch');
const ObjectID = require('mongodb').ObjectID;

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
            const formatted = [];

            newsList.forEach(news => {
                const content = news['content'];

                if (content['clickThroughUrl'] === null || content['thumbnail'] === null)
                    return;

                const insertData = {
                    _id: content['id'],
                    title: content['title'],
                    contentType: content['contentType'] || "NEWS",
                    thumbnailUrl: content['thumbnail']['resolutions'].slice(-1)[0]['url'],
                    originalUrl: content['clickThroughUrl']['url'],
                    provider: content['provider']['displayName'],
                    publicationDate: content['pubDate'],
                };

                formatted.push(insertData);
            });
            db.collection('news').insertMany(formatted, { ordered: false });
        });
    }
};

module.exports = News;