should = require('should');
var app = require('../server');
var request = require('supertest');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

describe('<Unit Test>', function () {
  
    describe('Gulp css', function () {
        it('should return false since the file has been deleted', function (done) {
            expect(fs.existsSync('./public/css/common.css')).to.be.equal(false);
            done();
        });

    });
    describe('Bower components', function () {
        it('should return false since the directory has been deleted', function (done) {
            expect(fs.existsSync('./public/lib')).to.be.equal(false);
            done();
        });

    });



});