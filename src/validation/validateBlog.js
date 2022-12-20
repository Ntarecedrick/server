import joi from 'joi';
const { schema } = require('../models/Blog');

const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})


const blogSchema= joi.object({
    title: joi.string().required().min(5).trim(),
    content: joi.string().required().min(5).trim(),
    likes: joi.number().integer(),
    image: joi.string().required(),
});

const validateBlog= validator(blogSchema)

export default  validateBlog