const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    sourceID: String,
    recipientID: String,
    body: String,
    timeStamp: {
        type: Date,
        default: Date.now()
    },
    messageType: String
});


messageSchema.Statics = {
    findBySourceID: function(source, callback) {
        return this.find({})
            .where('sourceID').in([source])
            .select('_id, sourceID, body, timestamp, messageType')
            .exec(callback)
    },

    getAllGroupChats: function(callback) {
        return this.find({})
            .where('messageType')
            .in(['public'])
            .select('_id, sourceID, body, timeStamp, messageType')
            .exec(callback);
    },

    searchGroupChats: function(parameter, callback) {
        messageSchema.statics.searchPublicMessages = function(parameter, callback) {
            let reg = new RegExp(parameter);
            return this.find({
                    body: {
                        $regex: reg,
                        $options: 'i'
                    }
                })
                .where('messageType')
                .in(['public'])
                .select('_id, sourceID, body, timeStamp, messageType')
                .exec(callback)
        }
    },

    searchUserInGroupChats: function(parameter, callback) {
        let reg = new RegExp(parameter);
        return this.find({
                sourceID: {
                    $regex: reg,
                    $options: 'i'
                }
            })
            .where('messageType').in(['public'])
            .select('_id, sourceID, body, timestamp, messageType')
            .exec(callback)
    }
}

const message = mongoose.model('message', messageSchema);

module.exports = message;