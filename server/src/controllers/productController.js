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
        busy: false,
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
const getProductImgFromId = (req, res) => {
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
const getFirstProducFromCategory =  (req,res) =>{

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

/* Ritrovare tutti i prodotti (-image) dell'utente attivo dato il token */
const getUserProductFromToken = (req, res) => {

    User.find({token: req.params.token}).select("_id")
        .then(result => {

            Product.find({userID: result[0]._id.toString()}).select("-image")
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
const getTopProducts = (req, res) => {

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

const getProductFromName = (req, res) => {
    User.find({token: req.params.token}).select("_id")
        .then(result => {
            Product.find({name: { "$regex": req.params.name, "$options": "i" }, userID: {$ne: result[0]._id.toString()}}).select("-image")
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

const getMyProductFromToken = (req, res) => {
    User.find({token: req.params.token}).select("_id")
        .then(result => {

            Product.find({userID: result[0]._id}).select("-image")
                .then(result => {
                    res.send(result);
                })
                .catch(err => {
                    responses.InternalServerError(res, {message: err.message});
                });
        }).catch(err => {
        });
}

const deleteProductFromId = (req, res) => {

    User.find({token: req.params.token}).select("products -_id").then(
        result => {
            result[0].products.remove(req.params.id);
            User.findOneAndUpdate({token: req.params.token}, {products: result[0].products}, {new: true}).then(
                result => {
                    Product.findOneAndDelete({_id: req.params.id}).then(
                        result => {
                            responses.OkResponse(res, {message: "Product deleted successfully"});
                        }
                    ).catch(err => {
                        responses.InternalServerError(res, {message: err.message});
                    })
                })
    })
}

const editProductWithImgFromId = (req, res) => {
    const newP = {
        name: req.body.name,
        description: req.body.description,
        value: req.body.value,
        category: req.body.category,
        image: {
            data: fs.readFileSync(path.resolve(__dirname, "../../static/uploads/" + req.body.image.filename)),
            contentType: req.body.image.type
        },
        location: req.body.location,
        status: req.body.status
    }
    Product.findOneAndUpdate({_id: req.params.id}, newP,{new: true}).then(
        result => {
            responses.OkResponse(res, {message: "Product edited successfully"});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });

}

const editProductWithoutImgFromId = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, req.body,{new: true}).then(
        result => {
            responses.OkResponse(res, {message: "Product edited successfully"});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

const setBusy = (req, res) => {
    Product.findOneAndUpdate({_id: req.params.id}, req.body,{new: true})
        .then(result => {
            responses.OkResponse(res, {message: "Product edited successfully"});
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

const getProductFromId = (req, res) => {
    Product.find({_id: req.params.id}).select("name image -_id" ).then(
        result => {
            res.json(result);
        })
        .catch(err => {
            responses.InternalServerError(res, {message: err.message});
        });
}

const response = (req, res) => {
    res.send("ok");
}

module.exports = {
    createProduct,
    upload,
    getProductImgFromId,
    getFirstProducFromCategory,
    getUserProductFromToken,
    getTopProducts,
    getProductFromCategory,
    getProductFromName,
    getMyProductFromToken,
    deleteProductFromId,
    editProductWithImgFromId,
    editProductWithoutImgFromId,
    getProductFromId,
    setBusy,
    response
}