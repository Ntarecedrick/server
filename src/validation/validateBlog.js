import joi from 'joi';
const { schema } = require('../models/Blog');

const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})


const blogSchema= joi.object({
    title: joi.string().required().min(1).trim(),
    content: joi.string().required().min(5).trim(),
    likes: joi.number().integer(),
    image: joi.string().required(),
});

const CommentSchema= joi.object({
    name: joi.string().min(3).required().trim(),
    email: joi.string().email().required(),
    message: joi.string().min(5).required().trim()
})


exports.validateBlog= validator(blogSchema);
exports.validateComment = validator(CommentSchema);