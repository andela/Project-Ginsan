const sinon = require('sinon');
const expect = require('chai').expect;
require('sinon-mongoose');
const userModel = require('../../../app/models/user');

describe("Get all users", () => {
    // Test will pass if we get all users
    it("should return all users", (done) => {
        let userMock = sinon.mock(userModel);
        var expectedResult = {
            status: true,
            user: []
        };
        userMock.expects('find').yields(null, expectedResult);
        userModel.find((err, result) => {
            userMock.verify();
            userMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if we fail to get a user
    it("should return error", (done) => {
        var userMock = sinon.mock(userModel);
        var expectedResult = {
            status: false,
            error: "Something went wrong"
        };
        userMock.expects('find').yields(expectedResult, null);
        userModel.find((err, result) => {
            userMock.verify();
            userMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the user is saved
describe("Add a new User", () => {
    it("should create new user", (done) => {
        let userMock = sinon.mock(new userModel({
            username: 'martin',
            hashed_password: 'martin'
        }));
        let user = userMock.object;
        let expectedResult = {
            status: true
        };
        userMock.expects('save').yields(null, expectedResult);
        user.save((err, result) => {
            userMock.verify();
            userMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the user is not saved
    it("should return error, if user is not saved", (done) => {
        let userMock = sinon.mock(new userModel({
            username: 'bbaale',
            hashed_password: 'bbaale'
        }));
        let user = userMock.object;
        let expectedResult = {
            status: false
        };
        userMock.expects('save').yields(expectedResult, null);
        user.save((err, result) => {
            userMock.verify();
            userMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});