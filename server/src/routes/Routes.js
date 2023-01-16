const userController = require('../controllers/userController');
const productController = require("../controllers/productController");

module.exports = (app) => {
    app.route('/api/user/emailValidation')
        .post(userController.email);
    app.route('/api/user/signup')
        .post(userController.signup);
    app.route('/api/user/signin')
        .post(userController.login);
    app.route('/api/user/:token')
        .get(userController.getUserFromToken);
    app.route('/api/product/upload')
        .post(productController.upload.single('image'), productController.createProduct);
    app.route('/api/product/search/category/:category')
        .get(productController.searchProductForCategory)
    app.route('/api/product/search/name/:name')
        .get(productController.searchProductForName); //per il ritorno di immagini dal DB
    app.route('/api/product/search/user/:userID')
        .get(productController.searchProductForUser);
}