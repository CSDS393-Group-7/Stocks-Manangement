require('dotenv').config();
const env = process.env;
const app = require('../../classes/Stocks.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../database');

describe("test Stocks class", () => {
    it("getTopMentionedStocksSubreddit() should return array", async () =>{
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            const result = apps.getTopMentionedStocksSubreddit();
            expect(Array.isArray(result)).to.be.ok;
        })
    })
    it("getTopMentionedWallStreetBetsSubreddit() should return array", async () =>{
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            const result = apps.getTopMentionedWallStreetBetsSubreddit();
            expect(Array.isArray(result)).to.be.ok;
        })
    })
})