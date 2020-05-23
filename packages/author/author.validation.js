const Joi = require("@hapi/joi");

const schema = Joi.object({
    id: Joi.number()
        .allow(""),
    avatar: Joi.string()
        .allow(""),
    name: Joi.string()
        .required()
        .max(250),
    gender: Joi.string()
        .allow("")
        .min(3)
        .max(20)
        .valid(...["MALE", "FEMALE", "OTHER"])
        .error(() => { throw new Error("Type gender allow MALE, FEMALE, OTHER") }),
    about: Joi.string()
        .allow("")
        .min(20)
        .max(2000),
    social: Joi.string()
        .allow("")
        .min(10)
        .max(2000)
})

const createAndUpdate = schema.keys({
    id: Joi.number()
        .allow(""),
    avatar: Joi.string()
        .allow(""),
    name: Joi.string()
        .required()
        .max(250),
    gender: Joi.string()
        .allow("")
        .min(3)
        .max(20)
        .valid(...["MALE", "FEMALE", "OTHER"])
        .error(() => { throw new Error("Type gender allow MALE, FEMALE, OTHER") }),
    about: Joi.string()
        .allow("")
        .min(20)
        .max(2000),
    social: Joi.string()
        .allow("")
        .min(10)
        .max(2000)
})


export function validateCreateAndUpdate(body) {
    return createAndUpdate.validate(body);
}