const mongoose = require('mongoose');
const Joi = require('joi-oid');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
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

const Comment = mongoose.model('Comment', commentSchema);

const validateComment = (comment) => {
    const schema = Joi.object({
        postName: Joi.string().required(),
        content: Joi.string().min(1).max(1000).required(),
        userId: Joi.objectId().required()
    });
    return schema.validate(comment);
}
exports.Comment = Comment;
exports.validateComment = validateComment;