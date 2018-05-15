/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user;

function getRandomString() {
    return Math.random().toString(36).substring(7)
}

//The tests
describe('<Unit Test>', function() {
    xdescribe('Model User:', function() {
        before(function(done) {
            user = new User({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                username: getRandomString(),
                password: 'john'
            });

            done();
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return user.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save witout name', function(done) {
                user.name = '';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        after(function(done) {
            done();
        });
    });
});