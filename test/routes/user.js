var mongoose = require("mongoose"),  
   User = mongoose.model('User'),

//Require the dev-dependencies
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  app = require('../../server'),
  expect = chai.expect;

chai.use(chaiHttp);
//Our parent block

describe('<Unit Test>', function() {

  //The tests

    describe('User Routes:', function() {  

    /*
  * Test the /users/me route
    */     

     
         describe('/Get current user', function() {
            it('it should Get the current user or null if there is no current user', function(done) {                
                chai.request(app)
                  .get('/users/me')
                  .end(function(err, res){ 
                      expect(res).to.have.status(200);
                      expect(res.body).to.satisfy(function(val){
                         return typeof(val) == "object";
                      }); 
                    done();
                  });
            });
            
        });

     
    });
       
    });
