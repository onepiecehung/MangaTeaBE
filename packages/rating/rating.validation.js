const Joi = require('@hapi/joi');
const schema = Joi.object({
    mangaID: Joi.string()
        .allow(""),
    groupTranslationID: Joi.string()
        .allow(""),
    userID: Joi.number()
        .required()
        .error(() => { throw new Error("Invalid user") }),
    rateNumber: Joi.number()
        .required()
        .max(10)
        .min(1),
    rateContent: Joi.string()
        .allow(""),
    typeRating: Joi.string()
        .required()
        .valid(...["MANGA", "GROUPTRANSLATION"])
})

const createAndUpdate = schema.keys({
    mangaID: Joi.string()
        .allow(""),
    groupTranslationID: Joi.string()
        .allow(""),
    userID: Joi.number()
        .allow("")
        .error(() => { throw new Error("Invalid user") }),
    rateNumber: Joi.number()
        .required()
        .max(10)
        .min(1),
    rateContent: Joi.string()
        .allow(""),
    typeRating: Joi.string()
        .required()
        .valid(...["MANGA", "GROUPTRANSLATION"])
})

export function validateCreateAndUpdate(body) {
    return createAndUpdate.validate(body)
}