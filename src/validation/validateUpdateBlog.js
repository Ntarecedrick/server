import joi from 'joi';

const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})


const UpdateSchema= joi.object({
    title: joi.string().required().min(1).trim(),
    content: joi.string().required().min(5).trim(),
    likes: joi.number().integer(),
    image: joi.string().required(),
});

const validateUpdates= validator(UpdateSchema)

export default  validateUpdates