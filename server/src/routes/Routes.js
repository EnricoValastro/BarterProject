const userController = require('../controllers/userController');
const productController = require("../controllers/productController");
const pendingTransactionsController = require("../controllers/pendingTransactionsController");

module.exports = (app) => {

    app.route('/api/user/emailValidation')
        .post(userController.emailValidation);
    app.route('/api/user/signup')
        .post(userController.signup);
    app.route('/api/user/signin')
        .post(userController.signin);
    app.route('/api/user/getuserid/:token')
        .get(userController.getUserIdFromToken);
    app.route('/api/user/:token')
        .get(userController.getUserFromToken);

    app.route('/api/product/upload')
        .post(productController.upload.single('image'), productController.createProduct);
    app.route('/api/product/update')
        .post(productController.upload.single('image'), productController.response);
    app.route('/api/product/getimgbyid/:id')
        .get(productController.getProductImgFromId);
    app.route('/api/product/getuserproductbytoken/:token')
        .get(productController.getUserProductFromToken);
    app.route('/api/product/setbusy/:id')
        .put(productController.setBusy);

    app.route('/api/product/home/gettopproducts/:token')
        .get(productController.getTopProducts);
    app.route('/api/product/home/getfirstproductincategory/:category/:token')
        .get(productController.getFirstProducFromCategory)

    app.route('/api/product/search/getproductbycategory/:category/:token')
        .get(productController.getProductFromCategory);
    app.route('/api/product/search/getproductbyname/:name/:token')
        .get(productController.getProductFromName);

    app.route('/api/product/market/getmyproductbyid/:token')
        .get(productController.getMyProductFromToken);
    app.route('/api/product/market/deleteproduct/:id/:token')
        .delete(productController.deleteProductFromId);
    app.route('/api/product/market/editproductwithimg/:id')
        .put(productController.editProductWithImgFromId);
    app.route('/api/product/market/editproductwithoutimg/:id')
        .put(productController.editProductWithoutImgFromId);

    app.route('/api/transactions/getpendingtransactions/:token')
        .get(pendingTransactionsController.getPendingTransactions);
    app.route('/api/transactions/addnewpendingtransaction')
        .post(pendingTransactionsController.addNewPendingTransaction);
    /*app.route('/api/transactions/removependingtransaction/')*/

    app.route('/api/product/market/getproductbyid/:id')
        .get(productController.getProductFromId);

}