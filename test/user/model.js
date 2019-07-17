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
  describe('Model User: CRUD', function () {
    before(function (done) {
      user = new User({
        name: 'Yorc',
        email: 'yorc@yoste.io',
        password: 'humian'
      })

      done()
    })

    describe('Create opeation', function () {
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
    describe('Read operation', () => {
      it('should return all users ', () => {
        return User.find((err, res) => {
          res.should.be.an.instanceof(Array).with.lengthOf(1)
          should.not.exist(err)
        })
      })
    })

    describe('Update operation', () => {
      before((done) => {
        let newPlayer = new User({
          name: 'Don',
          password: 'nod',
          email: 'don@me'
        })
        newPlayer.save((err, res) => {
          if (err) {
            console.error(err)
          }
        })
        done()
      })
      it('should update a user given their name', () => {
        return User.updateOne({ name: 'Yorc' }, { name: 'Baham' }, (err, res) => {
          should.not.exist(err)
          res.should.be.instanceOf(Object).and.have.property('nModified', 1)
        })
      })
      it('Should not update an non-existing user', () => {
        return User.updateOne({ name: 'IDon\'tExist' }, { name: 'IExist' }, (err, res) => {
          should.not.exist(err)
          res.should.be.an.instanceof(Object).and.have.property('nModified', 0)
        })
      })
    })

    describe('Delete operation', () => {
      it('should delete all users given no params ', () => {
        return User.deleteMany({}, (err, res) => {
          should.not.exist(err)
          res.should.be.instanceOf(Object).and.have.property('deletedCount', 2)
        })
      })
    })
    after(function (done) {
      done()
    })
  })
})
