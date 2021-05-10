require('dotenv').config();
const env = process.env;
const app = require('../../classes/Price.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../database');

const stocksList = ["AAA", "AMZN", "FB"]
describe("test Price class", () =>{
    describe("test get Stock Price list", () => {
        it("Result should be an object", () => {
            db.connect(process.env.DATABASE, async (err) => {
                if (err)
                    throw err;
                result = app.getStockPrice(stocksList);
                expect(result).to.be.an('object');
            })
        })
        it("The fields of the object should be number", () => {
            db.connect(process.env.DATABASE, async (err) => {
                if (err)
                    throw err;
                result = app.getStockPrice(stocksList);
                expect(result.AMZN).to.be.a('number');
                expect(result.AAA).to.be.a('number');
                expect(result.FB).to.be.a('number');
            })
        })

    })
    describe("test get specific stock price", () => {
        
        it("Getting AMZN price", () => {
            db.connect(process.env.DATABASE, async (err) => {
                if (err)
                    throw err;
                result = app.getSpecificStockPrice("AMZN");
                expect(result).to.be.an('object');
                expect(result.AMZN).to.be.a('number');
            })
        })
    })
})