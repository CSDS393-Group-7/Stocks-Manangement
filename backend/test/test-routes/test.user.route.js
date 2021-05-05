const request = require("supertest");
const rest_app = require('../../server/rest_server.js');
const chai = require("chai");
const should = chai.should();
const db = require('../../database');

require('dotenv').config();
const userExisted = {
    "username":"locdeptrai",
    "password":"loclocloc",
    "fullName":"loc",
    "email":"123@gmail.com"
};
const newUser = {
    "username":"testing_not_existed",
    "password":"123",
    "fullName": "thanh tung",
    "email":"tungtt@gmail.com"
};
const userToLogin = {
    "username":"testing_tung",
    "password":"123"
};
const userWrongPassword = {
    "username":"testing_tung",
    "password":"123456"
};
const userDoesntExist = {
    "username":"loc",
    "password":"123456"
};

describe('/api/user/create', (done) => {
    it("Return 409- user already existed",  (done) => {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('/api/user/create')
                .send(userExisted)
                .expect( res =>{
                    res.body.should.equals(userExisted.username+" exists in database")
                })
                .expect(409,done);
        });
    });

    it('Return 200- sucessfully registered', function (done) {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('/api/user/create')
                .send(newUser)
                .expect(res =>{
                    res.body.should.be.an("string")
                })
                .expect(200, done);
        });
    });
});

describe('/api/user/login', (done) => {
    it("Return 200 - Successfully Login",  (done) => {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('/api/user/login')
                .send(userToLogin)
                .expect(200,done);
        });
    });

    it("Return 403 - Wrong Password",  (done) => {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('/api/user/login')
                .send(userWrongPassword)
                .expect(403,done);
        });
    });

    it("Return 404- User does not exist",  (done) => {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .post('/api/user/login')
                .send(userDoesntExist)
                .expect(404,done);
        });
    });
});

describe('/api/user/watchList', (done) =>{
    it('Return 200 - Successfully Get The Watch List and Authorized Token', function (done) {
        db.connect(process.env.DATABASE, (err) => {
            if (err)
                throw err;

            request(rest_app)
                .get('/api/user/watchList')
                .set("Authorization", "BEARER eyJhbGciOiJIUzI1NiJ9.dGVzdGluZ190cnVuZ18y.OckHqtlgjEZv4id-lywgI5l0PW0oRhNZMW8yQ4sHsdM")
                .expect(200,done);
        });
    });
});