const mongoose = require('mongoose');
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
            data: fs.readFileSync(path.resolve(__dirname , "../../static/uploads/" + req.file.filename)),
            contentType: req.file.mimetype
        },
        category: req.body.category,
        status: req.body.status,
        value: req.body.value,
        location: req.body.location,
        userID: req.body.userID
    });

    newProduct.save().then(result => {
        console.log('Product created successfully');
        res.send(result);
    }).catch(err => {
        console.log('Error creating product');
        console.log(err);
    });
}

const searchProduct = async (req, res) => {
    await Product.find({name: req.params.name})
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.send(err)
        });
}

module.exports = {
    createProduct,
    upload,
    searchProduct
}