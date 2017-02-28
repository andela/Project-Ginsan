var mongoose = require("mongoose"),
   Question = mongoose.model('Question'),
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

    describe('Model Question:', function() {  

    /*
  * Test the /GET route
  */     

        describe('/Get All Questions', function() {
            it('it should GET all the Questions', function(done) {                
                chai.request(app)
                  .get('/questions')
                  .end(function(err, res){                     
                      expect(res).to.have.status(200);
                      expect(res.body).to.be.a('array');
                      //res.body.length.should.not.be.eql(0);
                    done();
                  });
            });
            
        });


         describe('/Get current user', function() {
            it('it should Get the current user', function(done) {                
                chai.request(app)
                  .get('/users/me')
                  .end(function(err, res){ 
                      expect(res).to.have.status(200);
                      expect(res.body).to.satisfy(function(val){
                         return typeof(val) == "object";
                      });              
                      
                      //expect(res.body).to.be.a('null');
                      //res.body.length.should.not.be.eql(0);
                    done();
                  });
            });
            
        });

     
    });
       
    });
