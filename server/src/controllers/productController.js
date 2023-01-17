const mongoose = require('mongoose');
const User = mongoose.model('User');
const Product = require('../models/productModel')(mongoose);
const responses = require('./responses/response');
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const now = new Date;

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
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'
            || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg'){
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .svg, .jpg and .jpeg format allowed!'));
        }
    }
});

const createProduct = (req, res) => {
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
    newProduct.save().then(result => {
        User.findOne({_id: req.body.userID}).then(user => {
            user.products.push(result);
            user.save();
            responses.OkResponse(res, {message: "Product created successfully"});
        }).catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
    })
}

const searchProductForName = (req, res) => {
     Product.find({name: req.params.name})
        .then(result => {
            console.log(result);
            res.json(result)
        }).catch(err => {
            res.send(err)
        }).catch(err => {
         responses.InternalServerError(res, {message: err.message});
     });
}

const searchProductForCategory =  (req,res) =>{
    let product = [];
    let name = [];

    Product.find({category: req.params.category}).select("name").limit(8)
        .then(result => {
            console.log(result);
            result.forEach((item) => {
                product.push(item.name);
            });
            res.send(result);
        })
        .catch(err => {
            res.send(err)
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });

}
const searchProductForUser = (req, res) => {
    Product.find({userID: req.params.userID}).select("name -_id")
        .then(result => {
            res.json(result)
        }).catch(err => {
            res.send(err)
        }).catch(err => {
        responses.InternalServerError(res, {message: err.message});
    });
}

module.exports = {
    createProduct,
    upload,
    searchProductForName,
    searchProductForCategory,
    searchProductForUser
}