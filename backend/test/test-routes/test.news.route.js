const request = require("supertest");
const rest_app = require('../../server/rest_server.js');
const chai = require("chai");
const should = chai.should();
const db = require('../../database');
require('dotenv').config();

describe("/api/news/get-list", (done) =>{
    it('Return 200 - Successfully Get The List', (done) => {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .get('/api/news/get-list')
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.should.be.an('array').to.have.lengthOf(30);
                    let items = res.body;
                    items.forEach(item =>{
                        item.should.have.property("_id").an("string");
                        item.should.have.property("title").an("string");
                        item.should.have.property("contentType").an("string");
                        item.should.have.property("thumbnailUrl").an("string");
                        item.should.have.property("originalUrl").an("string");
                        item.should.have.property("provider").an("string");
                        item.should.have.property("publicationDate").an("string");
                    })
                })
                .expect(200,done);
        });
    });
});

describe("/api/news/search", (done) => {
    it("Return 200 - Successfully Get The Search List With No Input", (done) =>{
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            const requestSearchList = {
                "keywords": ""
            };
            request(rest_app)
                .post('/api/news/search')
                .set('Content-Type', 'application/json')
                .expect(res => {
                    res.body.should.be.an('array').to.have.lengthOf(30);
                    let items = res.body;
                    items.forEach(item =>{
                        item.should.have.property("_id").an("string");
                        item.should.have.property("title").an("string");
                        item.should.have.property("contentType").an("string");
                        item.should.have.property("thumbnailUrl").an("string");
                        item.should.have.property("originalUrl").an("string");
                        item.should.have.property("provider").an("string");
                        item.should.have.property("publicationDate").an("string");
                    })
                })
                .send(requestSearchList)
                .expect(200,done);
        });
    });

    it("Return 200 - Successfully Get The Search List With Input", (done) =>{
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            const requestSearchList = {
                "keywords": "CEO, "
            };
            request(rest_app)
                .post('/api/news/search')
                .set('Content-Type', 'application/json')
                .send(requestSearchList)
                .expect(res => {
                    let items = res.body;
                    items.forEach(item =>{
                        item.should.have.property("_id").an("string");
                        item.should.have.property("title").an("string");
                        item.should.have.property("contentType").an("string");
                        item.should.have.property("thumbnailUrl").an("string");
                        item.should.have.property("originalUrl").an("string");
                        item.should.have.property("provider").an("string");
                        item.should.have.property("publicationDate").an("string");
                    })
                })
                .expect(200,done);
        });
    });
});

