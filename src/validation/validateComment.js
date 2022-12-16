import joi from 'joi';

const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})


const CommentSchema= joi.object({
    name: joi.string().min(3).required().trim(),
    email: joi.string().email().required(),
    message: joi.string().min(5).required().trim()
})

const validateComment = validator(CommentSchema);

export default validateComment