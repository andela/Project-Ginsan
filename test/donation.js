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
                  premium: "1",
                  donations:{
                    crowdrise_donation_id: "142124"
                  }
            }
            };

          

            done();
        });

           describe('Add Donations', function() {
           
            it('should return that user and body are empty', function(done) {
               
                req.should.have.property('body');
                req.should.have.property('user');
                req.user.should.have.property('_id');

                it('should compare icd of person donating and the donation id', function() {
               
                    req.body.should.have.property('amount');
                    req.body.should.have.property('crowdrise_donation_id');
                    req.body.should.have.property('donor_name');

                    var duplicate=false;
                    for(i=0;i<req.user.should.have.length(2);i++){
                       it('should equal to',function(){
                        req.user.Donations[i].crowdrise_donation_id.should.be.eq(req.body.crowdrise_donation_id);
                        duplicate=true;
                       }); 
                    }
                
                });
                
                    done();
                });
           
             
            });


          
        });       

   
});