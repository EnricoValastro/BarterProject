const productController = require('../controllers/productController');


module.exports = (app) => {
    app.route('/api/product/upload')
        .post(productController.upload.single('image'), productController.createProduct);
    app.route('/api/product/:title')
        .get(productController.searchProduct);
}