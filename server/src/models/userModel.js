const bcrypt = require('bcryptjs');

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

    userSchema.pre('save',  function(next) {
        let user = this;
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                next(err);
            }
            user.password = hash;
            next();
        });
    });
    return mongoose.model('User', userSchema);
};
