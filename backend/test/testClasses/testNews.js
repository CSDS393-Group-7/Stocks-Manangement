//process.env.NODE_ENV = 'test'
require('dotenv').config();
const env = process.env;
const apps = require('../../classes/News.js');
const server = require('../../index.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../database');


db
describe('News', () => {
    describe('pullDataFromProviders', () => {
        it('should fetch more news', () => {
            db.connect(process.env.DATABASE, async function(err) {
                if(err)
                    throw err;

                const beforeFetchCount = await db.collection('news').count();
                apps.pullDataFromProviders();
                const afterFetchCount =  await db.collection('news').count();
                expect(afterFetchCount).to.be.at.least(beforeFetchCount);
            });  
        })
    })
    describe('getNewsList', () => {
        const result = apps.getNewsList();
        const limit = env.NEWS_LIMIT;
        it('should return the whole collection if count <= limit', () => {
            db.connect(process.env.DATABASE, async function(err) {
                if(err)
                    throw err;
                if(db.collection('news').count <= limit) expect(result).to.be.deep.equal(db.find().sort({publicationDate: -1}).toArray());
            })
        })
        it('should return the limited number of news areticle if the count > limit', ()=>{
            db.connect(process.env.DATABASE, async function(err) {
                if(err)
                    throw err;
                if(db.collection('news').count > limit) expect(result).to.be.deep.equal(db.find().sort({publicationDate: -1}).limit(limit).toArray());
            })
        })
    })
})