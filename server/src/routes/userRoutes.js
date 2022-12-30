const userController = require('../controllers/userController');

module.exports = (app) => {
   /*
    app.route('/')
        .get(userController.index);
    */
    app.route('/api/signup')
        .post(userController.signup);
    app.route('/api/login')
        .post(userController.login);
}