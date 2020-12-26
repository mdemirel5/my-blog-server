const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const partizip2ExSchema = new Schema({
    verb: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    hilfVerb: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    partizip2: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    level: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2
    }
}
);

const Partizip2Ex = mongoose.model('Partizip2Ex', partizip2ExSchema);

const validatePartizip2Ex = (ex) => {
    const schema = Joi.object({
        verb: Joi.string().min(1).max(50).required(),
        hilfVerb: Joi.string().min(1).max(50).required(),
        partizip2: Joi.string().min(1).max(50).required(),
        level: Joi.string().min(1).max(2).required()
    });
    return schema.validate(ex);
}
exports.Partizip2Ex = Partizip2Ex;
exports.validatePartizip2Ex = validatePartizip2Ex;