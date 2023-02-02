const mongoose = require('mongoose');
const Notifications = mongoose.model("Notification");
const User = mongoose.model('User');
const responses = require('./responses/response');

const getNotifyFromUserToken = (req, res) => {
    User.find({token: req.params.token})
        .then(result => {
            Notifications.find({receiverId: result[0]._id})
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

const addNewNotify = (senderId, receiverId, senderName, receiverProductName, senderProductId, receiverProductId ) => {
    const newNotify = new Notifications({
        senderId: senderId,
        receiverId: receiverId,
        senderName: senderName,
        receiverProductName: receiverProductName,
        read: false,
        senderProductId: senderProductId,
        receiverProductId: receiverProductId
    });
    newNotify.save()
        .then(result => {

        })
        .catch(err => {
            console.log(err.message);
        });
}

const updateNotify = (req, res) => {
    Notifications.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(result => {
            responses.OkResponse(res, {message: 'Notification updated successfully'});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

const deleteNotify = (req, res) => {
    Notifications.findOneAndDelete({senderProductId: req.params.senderProductId, receiverProductId: req.params.receiverProductId})
        .then(result => {
            responses.OkResponse(res, {message: 'Notification deleted successfully'});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

module.exports = {
    addNewNotify,
    getNotifyFromUserToken,
    updateNotify,
    deleteNotify
}