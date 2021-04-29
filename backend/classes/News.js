'use strict'

require('dotenv').config();
const fetch = require('node-fetch');
const ObjectID = require('mongodb').ObjectID;

const db = require('../database');

class News {
    static PULL_DATA_COUNTER = 0;

    static async pullDataFromProviders() {
        console.log(`[NEWS]: Starting to pull data | ${++(News.PULL_DATA_COUNTER)} times`);
        const url = 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?snippetCount=40';
        await fetch(url, { 
            method: "POST",
            headers: {
                "x-rapidapi-key": process.env.YAHOO_FIN_APIKEY,
                "x-rapidapi-host": process.env.YAHOO_FIN_HOST,
                "useQueryString": true,
            }
        })
        .then(res => res.json())
        .then(data => data['data']['main']['stream'])
        .then(newsList => {
            const formatted = [];
            console.log(`[NEWS]: Before filtering: ${newsList.length}`);

            newsList.forEach(news => {
                const content = news['content'];

                try {
                    const insertData = {
                        _id: content['id'],
                        title: content['title'],
                        contentType: content['contentType'] || "NEWS",
                        thumbnailUrl: content['thumbnail']['resolutions'].slice(-1)[0]['url'],
                        originalUrl: content['clickThroughUrl']['url'],
                        provider: content['provider']['displayName'],
                        publicationDate: new Date(content['pubDate']),
                    };
    
                    formatted.push(insertData);
                }
                catch (err) { return; }

            });
            
            db.collection('news').insertMany(formatted, { ordered: false });
            console.log(`[NEWS]: After filtering: ${formatted.length}`);
        });
        
        console.log(`[NEWS]: Successfully pulled data`);
    }

    static async getNewsList() {
        const limit = Number(process.env.NEWS_LIMIT);
        return await db.collection('news').find()
            .sort({publicationDate: -1})
            .limit(limit)
            .toArray();
    }

    static async search(keyword) {
        const limit = Number(process.env.NEWS_LIMIT);
        return await db.collection('news').find(
            { $text: { $search: keyword }},
            { score: { $meta: "textScore" }} 
        )
        .sort({ score: { $meta: "textScore" } })
        .limit(limit)
        .toArray();
    }
};

module.exports = News;