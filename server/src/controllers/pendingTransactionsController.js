const mongoose = require('mongoose');
const PendingTransaction = require('../models/pendingTransactions')(mongoose);
const responses = require('./responses/response');

const getPendingTransactions = (req, res) => {
    PendingTransaction.find({senderId: req.params.senderid})
        .then(result =>{
            res.json(result);
        })
        .catch(err =>{
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