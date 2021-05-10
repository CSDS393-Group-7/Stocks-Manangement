const request = require("supertest");
const rest_app = require('../../server/rest_server.js');
const chai = require("chai");
const should = chai.should();
const db = require('../../database');

const stockToAdd = {
    "stock": "MVIS",
    "quantity": 10,
    "price": 24
};

describe("api/stock/addStock", (done) => {
    it('Add Stock', function () {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('api/stock/addStock')
                .set("Authorization", "BEARER eyJhbGciOiJIUzI1NiJ9.aGlldW5jdDIwMDM.-Re-x1PCepGIhuMhG6_k-53KHPohJQC1LgT9qlTKkwA")
                .send(stockToAdd)
                .expect(res =>{
                    let item = res.body;
                    item.should.have.property("stock").equals(stockToAdd.stock);
                    item.should.have.property("quantity").equals(stockToAdd.quantity);
                    item.should.have.property("price").equals(stockToAdd.quantity);
                })
                .expect(200,done);
        });
    });
});

describe("api/stock/topMentionedStocksSub", (done) => {
    it('Return 200 - Succesfully Get Top Mentioned Stock ', function () {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .get('api/stock/topMentionedStocksSub')
                .expect(res => {
                    res.body.should.be.an("array").to.have.lengthOf(20);
                    res.statusCode.equals(200);
                    let items = res.body;
                    items.forEach(item => {
                        item.should.have.property("_id");
                        item.should.have.property("day");
                        item.should.have.property("week");
                        item.should.have.property("3week");
                        item.should.have.property("month");
                        item.should.have.property("year");
                    });
                }, done);
        });
    });
});

describe("api/stock/topMentionedWallStreetSub", (done) => {
    it('Return 200 - Succesfully Get Top Mentioned Wall Street Stock ', function () {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .get('api/stock/topMentionedWallStreetSub')
                .expect(res => {
                    res.body.should.be.an("array").to.have.lengthOf(20);
                    res.statusCode.equals(200);
                    let items = res.body;
                    items.forEach(item => {
                        item.should.have.property("_id");
                        item.should.have.property("day");
                        item.should.have.property("week");
                        item.should.have.property("3week");
                        item.should.have.property("month");
                        item.should.have.property("year");
                    });
                }, done);
        });
    });
});

