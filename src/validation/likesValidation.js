import Joi from "joi"

const validator= (schema) => (payload) => schema.validate(payload, { abortEarly: false})

const schemaLikes= Joi.object({
    email: Joi.string().email().required()
})


const ValidateLikes= validator(schemaLikes);

export default ValidateLikes
