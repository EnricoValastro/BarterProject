const mongoose = require('mongoose');
const PendingTransaction = require('../models/pendingTransactions')(mongoose);
const User = mongoose.model('User');
const responses = require('./responses/response');

const getPendingTransactions = (req, res) => {
    User.find({token: req.params.token}).select("_id")
        .then(result => {
            PendingTransaction.find({senderId: result[0]._id.toString()})
                .then(result =>{
                    res.json(result);
                })
                .catch(err =>{
                    responses.InternalServerError(res, {message: "Error: "+err.message});
                });
        })
        .catch(err => {
            responses.InternalServerError(res, {message: "Error: "+err.message});
        });
}

const addNewPendingTransaction = (req, res) => {
    const newPendingTransaction = new PendingTransaction(req.body);
    newPendingTransaction.save().then(result =>{
        responses.OkResponse(res, {message: "Transaction created."})
    }).catch(err =>{
        responses.InternalServerError(res, {message: "Error: "+err.message});
    });
}

const removePendingTransaction = (req, res) => {
    //ToDo
}

module.exports = {
    getPendingTransactions,
    addNewPendingTransaction,
    removePendingTransaction
}