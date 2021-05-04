process.env.NODE_ENV = 'test'
const env = process.env;
const apps = require('../../classes/News.js');
const server = require('../../index.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../database');



describe('News', () => {
    beforeEach(function() {
      });
    describe('pullDataFromProviders', ()=>{
        it('should fetch more news', () => {
            const beforeFetchCount = db.collection('news').count();
            apps.pullDataFromProviders();
            const afterFetchCount = db.collection('news').count();
            expect(afterFetchCount).to.be.at.least(beforeFetchCount);
        })
    })
    describe('getNewsList', ()=>{
        const result = apps.getNewsList();
        const limit = env.NEWS_LIMIT;
        it('should return the whole collection if count <= limit', () => {
            if(db.collection('news').count <= limit) expect(result).to.be.deep.equal(db.find().sort({publicationDate: -1}).toArray());
        })
        it('should return the limited number of news areticle if the count > limit', ()=>{
            if(db.collection('news').count > limit) expect(result).to.be.deep.equal(db.find().sort({publicationDate: -1}).limit(limit).toArray());
        })
    })
})