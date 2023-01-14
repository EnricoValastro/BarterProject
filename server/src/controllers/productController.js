const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = require('../models/productModel')(mongoose);
const responses = require('./responses/response');
const multer = require('multer');
const fs = require("fs");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const now = new Date;
const createProduct = async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: {
            data: fs.readFileSync(path.resolve(__dirname, "../../static/uploads/" + req.file.filename)),
            contentType: req.file.mimetype
        },
        date: Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()),
        category: req.body.category,
        status: req.body.status,
        value: parseFloat(req.body.value),
        location: req.body.location,
        userID: req.body.userID
    });

    newProduct.save().then(async result => {
        await User.findOne({_id: req.body.userID}).then(user => {
            user.products.push(result);
            user.save();
            responses.OkResponse(res, {message: "Product created successfully"});
        }).catch(err => {
            responses.InternalServerError(res, err);
        });
    })
}

const searchProductForName = async (req, res) => {
    await Product.find({name: req.params.name})
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.send(err)
        });
}

const searchProductForCategory = async (req,res) =>{
    await Product.find({category: req.params.category}).limit(8)
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.send(err)
        });
}

module.exports = {
    createProduct,
    upload,
    searchProductForName,
    searchProductForCategory
}