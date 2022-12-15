const { string } = require('joi');
const joi = require('joi');
const user= require('../models/user');



const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false});

const userSchema= joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required()
})

exports.validateUser= validator(userSchema);