/**
 * Module dependencies.
 */
var should = require('should');

//Globals
var req;

//The tests
describe('Donations', function() {
    describe('Adding Donations', function() {
        before(function(done) 
        {
            req={
                body:{
                amount: "200",
                crowdrise_donation_id: "142124",
                donor_name: "Raphael Wanjiku"
            },
            user:{
                  _id: "1",
                  premium: "1"
            }
            };

          

            done();
        });

           describe('Test1', function() {
            it('should test that user and body are not empty', function(done) {
               
                req.should.have.property('body');
                req.should.have.property('user');
                
                    done();
                });
            });

          
        });       

   
});