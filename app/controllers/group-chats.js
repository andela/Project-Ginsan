const messageModel = require('../models/message');

const messages = {

    getOneMessage: (req, res) => {
        let userID = req.body.user.sourceID;

        messageModel.findBySourceID(userID, (error, results) => {
            if (error) {
                throw error;
            } else {
                res.status(200).send(results);
            }
        });
    },

    createMessage: (req, res) => {
        let incomingMessage = req.body.message;
        let newMessage = new messageModel(incomingMessage);

        if (incomingMessage) {
            newMessage.save((error, results) => {
                if (error) {
                    throw error;
                } else {
                    res.status(200).send(results);
                    //I should emit the message at this point using socket.io
                }
            });
        } else {
            res.status(500).send('you cannot send an empty message');
        }

    },

    getAllChats: (req, res) => {
        let response = {};
        messageModel.getAllGroupChats((error, results) => {
            if (error) {
                throw error;
            } else {
                res.status(200).send(results);
            }
        });

    },

    search: (req, res) => {
        let param = req.body.param;
        messageModel.searchGroupChats(param, (error, results) => {
            if (error) {
                res.status(500).send('there is a server error');
                throw error;
            } else {
                res.status(200).send(results);
            }
        });
    },

    searchUserInPublic: (req, res) => {
        let param = req.body.param;

        messageModel.searchUserInGroupChats(param, (error, results) => {
            if (error) {
                res.status(500).send('there is a server error')
                throw error;
            } else {
                res.status(200).send(results);
            }
        });
    }
}


module.exports = messages;