let sinon = require('sinon');
let expect = require('chai').expect;
require('sinon-mongoose');
let messageModel = require('../../../app/models/message');

describe("Get all messages", () => {
    // Test will pass if we get all messages
    it("should return all messages", (done) => {
        let messageMock = sinon.mock(messageModel);
        let expectedResult = {
            status: true,
            message: []
        };
        messageMock.expects('find').yields(null, expectedResult);
        messageModel.find((err, result) => {
            messageMock.verify();
            messageMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if we fail to get all the messages
    it("should return error", (done) => {
        let messageMock = sinon.mock(messageModel);
        let expectedResult = {
            status: false,
            error: "Something went wrong"
        };
        messageMock.expects('find').yields(expectedResult, null);
        messageModel.find((err, result) => {
            messageMock.verify();
            messageMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the Message is saved
describe("Add a new Message", () => {
    it("should create new message", (done) => {
        let messageMock = sinon.mock(new messageModel({
            sourceID: 'martin',
            recipientID: 'bbaale',
            body: 'Test'
        }));
        let message = messageMock.object;
        let expectedResult = {
            status: true
        };
        messageMock.expects('save').yields(null, expectedResult);
        message.save((err, result) => {
            messageMock.verify();
            messageMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the message is not saved
    it("should return error, if message is not saved", (done) => {
        let messageMock = sinon.mock(new messageModel({
            sourceID: 'martin',
            recipientID: 'bbaale',
            body: 'Test'
        }));
        let message = messageMock.object;
        let expectedResult = {
            status: false
        };
        messageMock.expects('save').yields(expectedResult, null);
        message.save((err, result) => {
            messageMock.verify();
            messageMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});