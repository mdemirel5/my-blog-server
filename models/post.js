const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const postSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        unique: true
    },
    numberOfLikes: {
        type: Number,
        required: true,
        min: 0,
        max: 8 * 10 ** 9
    }
});
const Post = mongoose.model('Post', postSchema);

const validatePost = post => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(100).required(),
        numberOfLikes: Joi.number().min(0).max(8 * 10 ** 9).required()
    });
    return schema.validate(post);
};

exports.Post = Post;
exports.validatePost = validatePost;