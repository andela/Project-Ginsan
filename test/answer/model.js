/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    Answer = mongoose.model('Answer');

//Globals
var user;

//The tests
describe('<Unit Test>', function() {
    describe('Model Answer:', function() {
        before(function(done) {
            user = new Answer({
                id: 3092,
                text: "",
                official: true,
                expansion: ""
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save whithout problems', function(done) {
                return user.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
        });

        after(function(done) {
            done();
        });
    });
});