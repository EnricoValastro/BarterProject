const mongoose = require('mongoose')
const double = require('mongoose-double')(mongoose);
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
        },
        status: {
            type: String,
            required: true
        },
        value:{
            type: double,
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