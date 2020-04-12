const Joi = require("@hapi/joi")

const schema = Joi.object({
    name: Joi.string()
        .required()
        .max(50),
    code: Joi.number()
        .required()
        .max(50),
    detail: Joi.string()
        .required()
        .max(500),
})


const createStatus = schema.keys({
    name: Joi.string()
        .required()
        .max(50),
    code: Joi.number()
        .required()
        .max(50),
    detail: Joi.string()
        .required()
        .max(500),
})



/**
 * 
 * @param {Object} body 
 */
export function validateCreateStatus(body) {
    return createStatus.validate(body)
}