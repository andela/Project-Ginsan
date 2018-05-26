var expect = require('chai').expect;
var app = require('../../server');
var request = require('supertest');
var Browser = require('zombie');
var assert = require("assert");
Browser.waitDuration = '60s';
browser = new Browser();

var server = null;


describe("Sign Up Using App Form",function () {

    this.timeout(0);

     beforeEach(function () {
        server = require('../../server').server;

        // browser = new Browser({ site: 'http://localhost:3000' });



    });

     it("should sign up by filling the sign up form",function (done) {

        browser.visit("http://127.0.0.1:3000/#!/signup", function () {
            // fill in login field
            browser.fill('email', 'john@zombie.com');
            // fill in password field
            browser.fill('name', 'Zombie o Zombie');
            browser.fill('password', 'zombie');
            // submit the form
            browser.pressButton('signup', function(error){
                if(error) return done(error);
                assert.ok(browser.success);
                browser.viewInBrowser();

            });
            // wait for new page to be loaded then fire callback function
            // browser.wait().then(function() {
            //     console.log('Form submitted ok!');
            //     // the resulting page will be displayed in your default browser
            //     browser.viewInBrowser();
            // })
        });
});

})