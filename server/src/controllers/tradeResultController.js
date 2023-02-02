const mongoose = require('mongoose');
const Result = require('../models/tradeResultNotifyModel')(mongoose);
const User = mongoose.model('User');
const responses = require('./responses/response');

const addNewResultNotification = (receiverId, productName, senderEmail, result) => {
    const newTradeRes = new Result({
        receiverId: receiverId,
        productName: productName,
        senderEmail: senderEmail,
        result: result
    });
    newTradeRes.save()
}

const getTradeResult = (req, res) => {
    User.find({token: req.params.token})
        .then(result => {
            Result.find({receiverId: result[0]._id})
                .then(result => {
                    res.json(result);
                })
                .catch(err => {
                    responses.InternalServerError(res, {message: err.message});
                });
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

const deleteTradeResult = (req, res) => {
    Result.findOneAndDelete({_id: req.params.id})
        .then(result => {
            responses.OkResponse(res, {message: 'Notification deleted successfully'});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}



module.exports = {
    addNewResultNotification,
    getTradeResult,
    deleteTradeResult
}