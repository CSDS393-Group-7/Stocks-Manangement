const request = require("supertest");
const rest_app = require('../../server/rest_server.js');
const chai = require("chai");
const should = chai.should();

describe("Test User Create Route", (done) => {
    const userToCreate = {"username":"testing_tung","password":"123", "fullName": "thanh tung","email":"tungtt@gmail.com"};
    it("Test create user",  (done) => {
         request(rest_app)
            .post('/api/user/create')
            .send(userToCreate)
            .expect(200)
            .then(res => {
                res.body.should.be.an('string');
                done();
            }).catch(done);
    });
});

describe("Test User Login Route", (done) => {
    const userToLogin = {"username":"locdeptrai","password":"loclocloc"};
    it("Test login user",  (done) => {
        request(rest_app)
            .post('/api/user/login')
            .send(userToLogin)
            .expect(200)
            .then(res => {
                res.body.should.be.an('string');
                done();
            }).catch(done);
    });
});