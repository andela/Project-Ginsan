/**
 * Module dependencies.
 */
var should = require('should')

var app = require('../../server')

var mongoose = require('mongoose')

var User = mongoose.model('User')

// Globals
var user

// The tests
describe('<Unit Test>', function () {
  describe('Model User:', function () {
    before(function (done) {
      user = new User({
        name: 'Yorc',
        email: 'yorc@yoste.io',
        password: 'humian'
      })

      done()
    })

    describe('Method Save', function () {
      it('should be able to save whithout problems', function (done) {
        return user.save(function (err, res) {
          res.should.have.property('name', 'Yorc')
          should.not.exist(err)
          done()
        })
      })

      it('should show error when trying to save without password', function (done) {
        user.password = ''
        return user.save(function (err) {
          should.exist(err)
          done()
        })
      })
    })

    after(function (done) {
      done()
    })
  })
})
