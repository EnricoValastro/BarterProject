const userController = require('../controllers/userController');

module.exports = (app) => {
   /*
    app.route('/')
        .get(userController.index);
    */
    app.route('/api/emailValidation')
        .post(userController.email);
    app.route('/api/signup')
        .post(userController.signup);
    app.route('/api/login')
        .post(userController.login);
    app.route('/api/user/:token')
        .get(userController.getUserFromToken);
}