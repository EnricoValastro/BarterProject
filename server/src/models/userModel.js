module.exports = function(mongoose) {
    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        token:{
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    });

    return mongoose.model('User', userSchema);
};
