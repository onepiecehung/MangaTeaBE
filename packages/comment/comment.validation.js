const Joi = require("@hapi/joi");
const schema = Joi.object({
    chapterID: Joi.number()
        .allow(""),
    mangaID: Joi.number()
        .allow(""),
    groupTranslationID: Joi.number()
        .allow(""),
    commentContent: Joi.string()
        .required()
        .max(10000)
        .min(10),
    type: Joi.string()
        .required()
        .valid(...["CHAPTER", "MANGA", "GROUPTRANSLATION"])
        .error(() => { throw new Error("Type comment is required") }),
})

const createAndUpdate = schema.keys({
    chapterID: Joi.number()
        .allow(""),
    mangaID: Joi.number()
        .allow(""),
    groupTranslationID: Joi.number()
        .allow(""),
    commentContent: Joi.string()
        .required()
        .max(10000)
        .min(10),
    type: Joi.string()
        .required()
        .valid(...["CHAPTER", "MANGA", "GROUPTRANSLATION"])
        .error(() => { throw new Error("Type comment is required") }),
})

export function validateCreateAndUpdate(body) {
    return createAndUpdate.validate(body)
}