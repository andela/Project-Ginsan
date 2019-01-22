/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    Avatar = require('../../app/controllers/avatars'),
    chai = require('chai'),
    request=require('supertest')
    expect = chai.expect;


var avatar;
//The tests
describe('AVATARS', function() {
    describe('Controller Avatar:', function() {
        beforeEach(function(done) {

             avatar= ['/img/chosen/E01.png',
            '/img/chosen/F01.png',
            '/img/chosen/FA04.png',
            '/img/chosen/FB03.png',
            '/img/chosen/FC01.png',
            '/img/chosen/FD01.png',
            '/img/chosen/FE01.png',
            '/img/chosen/FH03.png',
            '/img/chosen/FI02.png',
            '/img/chosen/H01.png',
            '/img/chosen/J01.png',
            '/img/chosen/M05.png',
            '/img/chosen/N02.png',
            '/img/chosen/N03.png',
            '/img/chosen/N04.png',
            '/img/chosen/N05.png'];
            
             done();

        });

        describe('Method All', function() {
            this.timeout(8000);
            it('should return the entire avatar object', function(done) {
                var object = Avatar.all(); 
                expect(object).to.eql(avatar)
                    //should.not.exist(err);
                   done();
            });
        
        });


        describe('Intergration', function(){
            this.timeout(5000)
            it('should return the json of all avatars', function(done){
                request(app)
                .get('/avatars')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .end(function(err, response){
                expect(response.statusCode).to.eql(200)
                expect(response.body).to.eql(avatar.slice(0,12));
                done();

                });

            })


        })

        afterEach(function(done) {
            done();
        });
    });
    
});
