var request = require('supertest'),
app = require('../server'),
mongoose = require('mongoose'),
User = mongoose.model('User');

describe('POST /api/auth/signup - Register with empty data)', function() {
    var usr= {
        name: '',
        password: '',
        email: '', 
    }
    it('Should Respond with Error', function(done) {
        request(app)
        .post('/api/auth/signup')
        .send(usr)
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});

var user = {
    name: "Test Test",
    email: "test@test.com",
    password: "mypwd",
}

describe('POST /api/auth/signup - Registering a user', function() {
    it('Should Respond with Error', function(done) {
        request(app)
        .post('/api/auth/signup')
        .send(user)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
});

describe('GET /users/me', function() {
    it('Should retrieve the current user', function(done) {
        request(app)
        .get('/users/me')
        .set(user['access-token'])
        .expect(200)
        .end((err) => {
            if (err) return done(err);
            done();
        });
    });
}); 