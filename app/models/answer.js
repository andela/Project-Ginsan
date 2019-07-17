/**
 * Module dependencies.
 */
var mongoose = require('mongoose')

var config = require('../../config/config')

var Schema = mongoose.Schema

/**
 * Answer Schema
 */
var AnswerSchema = new Schema({
  id: {
    type: Number
  },
  text: {
    type: String,
    default: '',
    trim: true
  },
  official: {
    type: Boolean
  },
  expansion: {
    type: String,
    default: '',
    trim: true
  }
})

/**
 * Statics
 */
AnswerSchema.statics = {
  load: function (id, cb) {
    this.findOne({
      id: id
    }).select('-_id').exec(cb)
  }
}

mongoose.model('Answer', AnswerSchema)
