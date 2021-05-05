const request = require("supertest");
const rest_app = require('../../server/rest_server.js');
const chai = require("chai");
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
                .send(requestSearchList)
                .expect(200,done);
        });
    });

    it("Return 200 - Successfully Get The Search List With Input", (done) =>{
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            const requestSearchList = {
                "keywords": "text, "
            };
            request(rest_app)
                .post('/api/news/search')
                .set('Content-Type', 'application/json')
                .send(requestSearchList)
                .expect(200,done);
        });
    });
});

