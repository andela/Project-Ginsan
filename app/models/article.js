/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    id: { type: Number },
    title: { type: String, required: true },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Article', ArticleSchema);