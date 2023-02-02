module.exports = function (mongoose){
    const PendingTransactionsSchema = new mongoose.Schema({
        senderId: {
            type: String,
            required: true
        },
        senderProductId: {
            type: String,
            required: true
        },
        receiverId: {
            type: String,
            required: true
        },
        receiverProductId: {
            type: String,
            required: true
        }
    });
    return mongoose.model('PendingTransactions', PendingTransactionsSchema);
}