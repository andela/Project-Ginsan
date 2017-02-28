var mongoose = require("mongoose"),
   Question = mongoose.model('Question'),

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


        describe('/GET/:id Question', function(){
          it('it should GET a question by the given id', function(done){
            var question = new Question({ text: "Where is the president of Nigeria", numAnswers: 3, official: false});
            question.save(function(err){
              console.log("question", JSON.stringify(question));
                chai.request(app)               
                .get('/questions/' + question._id.toString())
                .send(question)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('text');
                    expect(res.body).to.have.property('numAmswers');                   
                   // expect(res.body).to.have.property('_id').eql(question._id);
                  done();
                });
            });

          });
      });
    });
       
    });
