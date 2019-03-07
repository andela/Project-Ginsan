var should = require('should'),
    app = require('../../server'),
    mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User'),
    chai = require('chai'),
    assert = chai.assert,
    chaiHttp = require('chai-http');


chai.use(chaiHttp);
chai.Should();

const validUserEmail = 'olatunde@mailinator.com';
const validUserPassword = 'Password2344';

//The tests
describe('User Controller Tests', function () {
    describe('User Sign Up', function () {
        it('should be able to Sign Up with a valid email', async function (done) {
            await User.deleteMany({email: validUserEmail});
            const req = {email: validUserEmail, password: validUserPassword, name: 'olat'};
            chai.request(app)
                .post('/users/new')
                .send(req)
                .end((err, res) => {
                    should.equal(res.statusCode, 200);
                    done();
                });
        }).timeout(500000);

        it('should not sign up with an existing email', async function (done) {
            const userEmail = 'test@test.com';
            user = new User({
                name: 'Full name',
                email: userEmail,
                username: 'user',
                password: 'password'
            });
            await user.save();

            const req = {email: userEmail, password: 'Password0987', name: 'olat'};
            const {err, res} = await chai.request(app)
                .post('/users/new')
                .send(req);
            should.equal(res.statusCode, 400);
            done();
        });


    });
    describe('User Login', function () {
        it('should login with correct credentials and get a proper jwt', async function (done) {
            const req = {email: validUserEmail, password: validUserPassword};
            const {err, res} = await chai.request(app).post('/users/login').send(req);
            should.equal(res.statusCode, 200);
            const body = JSON.parse(res.text);
            const token = body.token;
            should.exist(token);
            const decoded = jwt.decode(token, {complete: true});
            should.exist(decoded);
            done();
        });

        it('should not login with incorrect credentials and and get a 401', async function (done) {
            let testEmail = 'test123@gmail.com';
            let result = await User.deleteMany({email: testEmail});
            const req = {email: testEmail, password: validUserPassword};
            const {err, res} = await chai.request(app).post('/users/login').send(req);
            should.equal(res.statusCode, 401);
            done();
        });
    });

    after(async function (done) {
        let result = await User.deleteMany({email: "test@test.com"});
        result = await User.deleteMany({email: validUserEmail});
        done();
    });
});
