should = require('should');
var app = require('../server');
var request = require('supertest');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

describe('<Unit Test>', function () {
  
    describe('Gulp css', function () {
        it('should return true since the file has been created', function (done) {
            expect(fs.existsSync('./public/css/common.css')).to.be.equal(true);
            done();
        });

    });
    describe('Bower components', function () {
        it('should return true since the directory has been created', function (done) {
            expect(fs.existsSync('./public/lib')).to.be.equal(true);
            done();
        });

    });



});