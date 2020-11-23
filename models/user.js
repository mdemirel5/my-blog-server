const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,

    },
    password: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        username: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(1).max(255).required()
    });
    return schema.validate(user);
};

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
