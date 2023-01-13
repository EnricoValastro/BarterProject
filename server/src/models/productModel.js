module.exports = function (mongoose) {
    const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        category: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            required: true
        },
        value:{
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    });
    return mongoose.model('Product', productSchema);
}