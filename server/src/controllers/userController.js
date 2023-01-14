const mongoose = require('mongoose');
const User = require('../models/userModel')(mongoose);
const responses = require('./responses/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const newUser = new User(req.body);

     await User.findOne({email: newUser.email}).then(async profile => {
        if (!profile) {
            // Token
            const token = jwt.sign(
                { user_id: newUser._id, email },
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

const getUserFromToken = (req, res) => {
    User.findOne({token: req.params.token}).then( profile => {
        if (profile) {
            res.send(profile);
        }
        else {
            res.send(false);
        }
    })
}

const email =  (req, res) => {
    const { email } = req.body;
    User.findOne({email: email}).then( profile => {
        if (profile) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    });
}

const login = async (req, res) =>{
    try {
        // Get user input
        const { email, password } = req.body;
        // Validate user input
        if (!(email && password)) {
            responses.BadRequestError(res, {message: 'All input is required'});
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.send({
                token: user.token,
            });

        } else {
            responses.BadRequestError(res, {message: 'Invalid credentials'});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    signup,
    login,
    email,
    getUserFromToken
}