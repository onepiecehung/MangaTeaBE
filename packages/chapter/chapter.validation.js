const Joi = require("@hapi/joi")
const schema = Joi.object({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .max(500),
    chapterNumber: Joi.number()
        .required()
        .max(50),
    createBy: Joi.number()
        .allow(""),
    updateBy: Joi.number()
        .allow(""),
    groupTranslation: Joi.number()
        .allow(""),
    language: Joi.number()
        .allow(""),
    photo: Joi.array()
        .allow(""),
    photoDrive: Joi.array()
        .allow(""),
    photoImgur: Joi.array()
        .allow(""),
    photoAw3: Joi.array()
        .allow(""),
    view: Joi.number()
        .allow(""),
    mangaID: Joi.number()
        .required(),
    status: Joi.string()
        .allow(""),
    permission: Joi.number()
        .allow(""),
})


const createAndUpdate = schema.keys({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .max(500),
    chapterNumber: Joi.number()
        .required()
        .max(50),
    createBy: Joi.number()
        .allow(""),
    updateBy: Joi.number()
        .allow(""),
    groupTranslation: Joi.number()
        .allow(""),
    language: Joi.number()
        .allow(""),
    photo: Joi.array()
        .allow(""),
    photoDrive: Joi.array()
        .allow(""),
    photoAw3: Joi.array()
        .allow(""),
    view: Joi.number()
        .allow(""),
    mangaID: Joi.number()
        .allow(""),
    status: Joi.string()
        .allow(""),
    permission: Joi.number()
        .allow(""),
})


export function validateCreateAndUpdate(body) {
    return createAndUpdate.validate(body);
}