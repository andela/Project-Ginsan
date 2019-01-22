var expect = require('chai').expect,
app = require('../../server'),
request = require('supertest');


  var authenticatedUser = request.agent(app);

  describe('Endpoints:', function() {

    it('should be able to run signin page', function(done) {
    authenticatedUser
      .get('/signin')
      .end(function(err, response){
        expect(response.statusCode == 200 || response.statusCode == 302 ).to.equal(true);
        expect('Location', '/#!');
        done();
      });

    });


    it('should be able to run signup page', function(done) {
        authenticatedUser
          .get('/signup')
          .end(function(err, response){
            expect(response.statusCode == 200 || response.statusCode == 302 ).to.equal(true);
            done();
          });
    
        });


  });
