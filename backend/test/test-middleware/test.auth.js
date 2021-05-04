const request = require("supertest");
const {expect} = require('chai');
const auth = require('../../middleware/auth')
const rest_app = require('../server/rest_server.js')

const loginWithDefaultUser = () => {
    const API = "http://localhost:8000/api/user/login";
    const user = {"username":"testing_tung","password":"123"}
    return request(rest_app)
        .post("http://localhost:8000/api/user/login")
        .send(user)
        .expect(200);
};

let result = loginWithDefaultUser();
console.log("Result is "+result);
let token = result.token;

describe("Test Authentication", () => {
    it("Test Authentication Middleware", () => {
        auth.authenticateToken()
            .send(token)
            .expect(200);
    });
});









