const Joi = require("@hapi/joi")

const schema = Joi.object({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .max(50),
    code: Joi.number()
        .required()
        .max(50),
    type: Joi.string()
        .required()
        .valid(...["CHAPTER", "MANGA", "GROUPTRANSLATION", "AUTHOR", "USER"])
        .error(() => { throw new Error("Type appellation is required") }),
    detail: Joi.string()
        .required()
        .max(500),
})


const createAppellation = schema.keys({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .max(50),
    code: Joi.number()
        .required()
        .max(50),
    type: Joi.string()
        .required()
        .valid(...["CHAPTER", "MANGA", "GROUPTRANSLATION", "AUTHOR", "USER"])
        .error(() => { throw new Error("Type appellation is required") }),
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