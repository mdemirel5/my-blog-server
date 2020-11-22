const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    content: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    user: {
        type: new mongoose.Schema({
            name: String
        }),
        required: true
    }

}, { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

const validateBlog = (blog) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(50).required(),
        content: Joi.string().min(5).max(1000).required(),
        userId: Joi.required()
    });
    return schema.validate(blog);
}
exports.Blog = Blog;
exports.validateBlog = validateBlog;