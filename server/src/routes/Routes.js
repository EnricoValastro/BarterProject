const userController = require('../controllers/userController');
const productController = require("../controllers/productController");

module.exports = (app) => {
    app.route('/api/user/emailValidation')
        .post(userController.emailValidation);
    app.route('/api/user/signup')
        .post(userController.signup);
    app.route('/api/user/signin')
        .post(userController.login);
    app.route('/api/user/:token')
        .get(userController.getUserFromToken);
    app.route('/api/product/upload')
        .post(productController.upload.single('image'), productController.createProduct);
    app.route('/api/product/home/getfirstproductincategory/:category/:token')
        .get(productController.getFirstProducFromCategory)
    app.route('/api/product/getimgbyid/:id')
        .get(productController.getProductImgFromId);
    app.route('/api/product/home/gettopproducts/:token')
        .get(productController.getTopProducts);
    app.route('/api/product/getuserproductbytoken/:token')
        .get(productController.getUserProductFromToken);
    app.route('/api/product/search/getproductbycategory/:category/:token')
        .get(productController.getProductFromCategory);
    app.route('/api/product/search/getproductbyname/:name/:token')
        .get(productController.getProductFromName);
}