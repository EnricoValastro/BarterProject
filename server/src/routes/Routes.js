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
    app.route('/api/product/search/firstincategory/:category/:token')
        .get(productController.searchFirstProductByCategory)
    app.route('/api/product/search/imgbyid/:id')
        .get(productController.searchProductImgById);
    app.route('/api/product/search/topproducts/:token')
        .get(productController.searchTopProducts);
    app.route('/api/product/getuserproductfromtoken/:token')
        .get(productController.getUserProductFromToken);
    app.route('/api/product/search/bycategory/:category/:token')
        .get(productController.getProductFromCategory);
}