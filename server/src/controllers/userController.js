const mongoose = require('mongoose');
const User = require('../models/userModel')(mongoose);
const responses = require('./responses/response');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const newUser = new User(req.body)
    await User.findOne({email: newUser.email}).then(profile => {
        if (!profile) {
            // Token
            const token = jwt.sign(
                { user_id: newUser._id, email: newUser.email },
                process.env.TOKEN_KEY,
                {
                    algorithm: "HS512",
                    expiresIn: '2h'
                }
            );
            newUser.token = token;
            newUser.save();
            responses.OkResponse(res, {message: 'Signup successful'});
        }
        else {
            responses.ConflictError(res, {message: 'User already exists'});
        }
    }).catch(err => {
        responses.InternalServerError(res, {message: err.message});
    });
}

const signin =  (req, res) =>{
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            responses.BadRequestError(res, {message: 'All input is required'});
        }
        User.find({ email: email, password: password})
            .then(result =>{
                res.send({
                    token: result[0].token
                });
            })
            .catch(err =>{
                responses.BadRequestError(res, {message: 'Invalid credentials'});
            })

    } catch (err) {
        console.log(err);
    }
}

const emailValidation =  (req, res) => {
    const { email } = req.body;
    User.findOne({email: email}).then( profile => {
        if (profile) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }).catch(err => {
        responses.InternalServerError(res, {message: err.message});
    });
}

const getUser = (req, res) => {
    User.findOne({token: req.params.token}).select('name email')
        .then( profile => {
            if (profile) {
                res.json(profile);
            }
            else {
                res.send(false);
            }
        }).catch(err => {
            responses.InternalServerError(res, {message: err.message});
        })
}

module.exports = {
    signup,
    signin,
    emailValidation,
    getUser
}