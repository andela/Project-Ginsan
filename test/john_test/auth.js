var expect = require('chai').expect;
var app = require('../../server');
var request = require('supertest');
var Browser = require('zombie');
var assert = require("assert");

Browser.waitDuration = '60s';
browser = new Browser();

var server = null;

describe("<Functional Test>",function () {

    this.timeout(0);


    beforeEach(function () {
        server = require('../../server').server;

        // browser = new Browser({ site: 'http://localhost:3000' });



    });


    it("should login with facebook",function (done) {

    	browser.visit("http://127.0.0.1:3000/auth/facebook", function () {
            // fill in login field

           browser.fill("email",'johntest@andelainterview.com');
           browser.fill("pass", 'johntest');
            // submit the form
            browser.pressButton('login', function(error){
                if(error) return done(error);
                assert.ok(browser.success);
                done();
                //browser.viewInBrowser();

            });
            // wait for new page to be loaded then fire callback function
            // browser.wait().then(function() {
            //     console.log('Form submitted ok!');
            //     // the resulting page will be displayed in your default browser
            //     browser.viewInBrowser();
            // })
        });

        // Browser.visit('http://127.0.0.1:3000/auth/facebook',function (error) {

        //     if(err){
        //         throw err;
        //     }

        //     brw.fill('email','aaa@gmail.com').fill('pass', 'password')
        //         .pressButton('login', function (error) {
        //           if(error) return done(error);
        //             assert.ok(browser.success);
        //         // browser.viewInBrowser();
        //         //     brw.assert.success();
        //             done();
        //         });

        // });



    });


    afterEach(function () {
       // server.close();
    });

});