import joi from 'joi';


const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})


const messageSchema = joi.object({
    name: joi.string().min(3).required().trim(),
    email: joi.string().email().required(), 
    message: joi.string().min(3).max(100).required()
})


const validateMessage= validator(messageSchema);

export default validateMessage
