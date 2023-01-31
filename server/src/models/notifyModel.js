module.exports = function (mongoose) {
    const notificationSchema = new mongoose.Schema({
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        senderName: String,
        receiverProductName: String,
        read: Boolean,
        senderProductId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        receiverProductId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    });
    return mongoose.model('Notification', notificationSchema);
};