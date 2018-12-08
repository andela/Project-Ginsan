/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


// Set surrent user info to use across.
var currentUser = {
    email: "johndoe12345@gmail.com",
    password: "password",
    name: "John Doe"
};

var invalidUser = {
    email: "sarahjoe1223@gmail.com",
    password: "password",
    name: "Sarah Doe"
};

describe('POST /api/auth/login', function() {
    it('Should Respond with 401 Unauthorized invalid login', function(done) {
        request(app)
        .post('/api/auth/login')
        .send(invalidUser)
        .set('Accept', 'application/json')
        .expect(401, done);
    });
});

describe('POST /api/auth/login', function() {
    it('Should Respond with JSON Response containing data.error key', function(done) {
        request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send(invalidUser)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            should(res.body.data).have.property('error', 'User not found');
            done();
        });
    });
});

describe('Perform Authentication (Login) and Ensure authenticated route', function() {
    describe('Creates a new User', function() {
        before(function(done) {
            user = new User(currentUser);
            user.save(function(err) {
                should.not.exist(err);
                done();
            });
        });
    
        describe('POST /api/auth/login', function() {
            it('Should Respond with 200, User Object and Token', function(done) {
                request(app)
                .post('/api/auth/login')
                .set('Accept', 'application/json')
                .send(currentUser)
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if(err) throw err;
                    should(res.body.user).have.properties('_id');
                    (res.body).should.have.propertyByPath('user', 'name').eql(currentUser.name);
                    should(res.body).have.properties('token');
                    currentUser['access-token'] = res.body.token;
                    done();
                });
            });
        });

        describe('GET /users/me', function() {
            it('Should return the current user information', function(done) {
                request(app)
                .get('/users/me')
                .set('access-token', currentUser['access-token'])
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if(err) throw err;
                    (res.body).should.have.value('name', currentUser.name);
                    should(res.body).have.properties('_id');
                    done();
                });
            });
        }); 
    });
});    

