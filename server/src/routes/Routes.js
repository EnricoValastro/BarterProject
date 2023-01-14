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
    app.route('/api/product/getbycategory/:category')
        .get(productController.searchProductForCategory)
    app.route('/api/product/getbyname/:name')
        .get(productController.searchProductForName);
}