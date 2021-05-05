require('dotenv').config();
const env = process.env;
const User = require('../../classes/User.js');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../database');

const existedUser = new User("tung");
const userDoesntExist = new User("loc");

describe("test for existed user", () =>{
    it("ifExists() should return true", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = existedUser.ifExists();
            expect(result).to.be.ok;
        })
    })
    it("getPWDFromDb() should return a string", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = existedUser.getPwdFromDb();
            expect(result).to.be.a('string');
        })
    })
    it("getFullName() should return a string", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = existedUser.getFullName();
            expect(result).to.be.a('string');
        })
    })
    it("getEmail() should return a string", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = existedUser.getEmail();
            expect(result).to.be.a('string');
        })
    })
    it("getWatchlist() should return an array", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = existedUser.getEmail();
            expect(Array.isArray(result)).to.be.ok;
        })
    })
})
describe("test for existed user", () =>{
    it("ifExists() should return false", () => {
        db.connect(process.env.DATABASE, async (err) => {
            if (err)
                throw err;
            
            const result = userDoesntExist.ifExists();
            expect(result).to.not.be.ok;
        })
    })
})