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

/* Ritrovare l'immagine di un prodotto dato l'id del prodotto */
const searchProductImgById = (req, res) => {
     Product.find({_id: req.params.id}).select("image -_id")
        .then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err)
        }).catch(err => {
         responses.InternalServerError(res, {message: err.message});
     });
}

/* Ritrovare i primi 8 prodotti (- image) data una categoria */
const searchFirstProductByCategory =  (req,res) =>{

    User.find({token: req.params.token}).select("_id")
        .then(result => {

            Product.find({category: req.params.category, userID: {$ne: result[0]._id}}).select("-image").limit(8)
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    res.send(err)
                })
                .catch(err => {
                    responses.InternalServerError(res, {message: err.message});
                });
        }).catch(err => {
    });
}

/* Ritrovare tutti i prodotti (solo nome & _id) dato il token di un utente */
const getUserProductFromToken = (req, res) => {

    User.find({token: req.params.token}).select("_id")
        .then(result => {

            Product.find({userID: result[0]._id.toString()}).select("name")
                .then(result => {
                    res.json(result);
                }).catch(err => {
                res.send(err)
            }).catch(err => {
                responses.InternalServerError(res, {message: err.message});
            });

        }).catch(err => {
        });


}

/* Ritrova i dati (-image) degli ultimi 8 prodotti aggiunti */
const searchTopProducts = (req, res) => {

    User.find({token: req.params.token}).select("_id")
        .then(result => {

            Product.find({userID: {$ne: result[0]._id}}).select("-image").sort({date: -1}).limit(8)
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    res.send(err)
                })
                .catch(err => {
                    responses.InternalServerError(res, {message: err.message});
                });
        }).catch(err => {

        });
}

/* Ritrova tutti i prodotti di una data categoria */
const getProductFromCategory = (req, res) => {
    User.find({token: req.params.token}).select("_id")
        .then(result => {
            Product.find({category: req.params.category, userID: {$ne: result[0]._id.toString()}}).select("-image")
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    res.send(err)
                })
                .catch(err => {
                    responses.InternalServerError(res, {message: err.message});
                });
        }).catch(err => {
    });
}

module.exports = {
    createProduct,
    upload,
    searchProductImgById,
    searchFirstProductByCategory,
    getUserProductFromToken,
    searchTopProducts,
    getProductFromCategory
}