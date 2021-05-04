const request = require('supertest');
const chai = require('chai');
const auth = require('../../middleware/auth')
let token;
before(async ()=> {
    //get token
    let resToken =  await loginWithDefaultUser();
    token = resToken.body.token;
    console.log("Token is "+token);
})

describe("Test Authentication", () => {
    it("Test Authentication Middleware", () => {
        auth.authenticateToken(token)

    })
})

const loginWithDefaultUser = () => {
    const API = "http://localhost:8000/api/user/login";
    const user = {"username":"testing_tung","password":"123"}
    return request.post(API).send(user).expect(200);
}