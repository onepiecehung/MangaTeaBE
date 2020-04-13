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


const createAppellation = schema.keys({
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
export function validateCreateAppellation(body) {
    return createAppellation.validate(body)
}