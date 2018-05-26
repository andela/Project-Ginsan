var assert = require('assert');
var request = require('request');
var expect = require('Chai').expect;
var socketUrl = 'http://localhost:3000';


describe('Get Landing Page', function(){
	it('should return 200', function (done) {
	  request.get(socketUrl, function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    //expect(res.body).to.equal('wrong header');
	    done();
	  });
	});


	it('should return 200', function (done) {
	  request.get(socketUrl+'/signup', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	   
	    done();
	  });
	});

	it('should return 200', function (done) {
	  request.get(socketUrl+'/signin', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	   
	    done();
	  });
	});
})




describe('Sign In', function(){
	it('it should return 302 because of the redirect', function (done) {
	  request.post(socketUrl+'/users/session', function (err, res, body){
	    expect(res.statusCode).to.equal(302);
	    // expect(res.body).to.equal('wrong header');
	    done();
	  });
	});


	
})



describe('Facebook LogIn', function(){
	this.timeout(15000);

	it('should return 200', function (done) {
	  request.get('http://localhost:3000/auth/facebook', function (err, res, body){
	    expect(res.statusCode).to.equal(200);
	    //expect(res.body).to.equal('unable to configure facebook log in');
	    this.timeout(15000);
	   setTimeout(done, 15000);
	  });
	});


	
})