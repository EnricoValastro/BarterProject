const productController = require('../controllers/productController');

module.exports = (app) => {
    app.route('/api/upload')
        .post(productController.upload.single('image'), productController.createProduct);
    app.route('/api/searchproduct/:title')
        .get(productController.searchProduct);
}