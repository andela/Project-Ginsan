/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user;

//The tests
describe('<Unit Test>', function() {
    describe('Model User:', function() {
        before(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            done();
        });

        describe('Method Save', function() {

            it('should create user model correctly', function(done) {
                //check user email here against what was created
                user.email.should.equal('test@test.com');
                done();
            });

            it('should be able to save whithout problems', function(done) {
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

        it('should throw an error when you try to save without passoword', function(done) {
            //set password to empty value
            user.password = '';
            //save and check if error exist
            return user.save(function(err) {
                should.exist(err);
                done();
            });
        });

        it('should throw an error when user premium value is not numeric', function(done) {
              //set name to empty value
              user.premium = 'premium';
              //save and check if error exist
              return user.save( (err)=>{
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
