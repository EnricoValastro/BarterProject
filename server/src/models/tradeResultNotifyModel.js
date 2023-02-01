module.exports = function (mongoose) {
    const tradeResultSchema = new mongoose.Schema({
        receiverId: {
            type: String,
            required: true
        },
        productName: String,
        senderEmail: String,
        result: Boolean
    });
    return mongoose.model('TradeResult', tradeResultSchema);
};