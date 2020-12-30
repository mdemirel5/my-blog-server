const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi-oid');


const likeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    postName: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Like = mongoose.model('Like', likeSchema);

const validateLike = like => {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        postName: Joi.string().required()
    });
    return schema.validate(like);
}
module.exports = { Like, validateLike };