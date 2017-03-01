var mongoose = require("mongoose"),

//Require the dev-dependencies
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  app = require('../../server');
  expect = chai.expect;

chai.use(chaiHttp);

//Our parent block

describe('<Unit Test>', function() {

  //The tests

    describe('Avatar:', function() {  

    /*
  * Test the /GET Avatars route
  */     

        describe('/Get All Avatars', function() {
            it('it should GET all the Avatars', function(done) {                
                chai.request(app)
                  .get('/avatars')
                  .end(function(err, res){
                      expect(res).to.have.status(200);
                      expect(res.body).to.be.a('array');                      
                    done();
                  });
            });
            
        });


    
    });
       
  });
