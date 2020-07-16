const Joi = require("@hapi/joi");

const schema = Joi.object({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .min(3)
        .max(200),
    userMemberID: Joi.array()
        .allow(""),
    mangaID: Joi.array()
        .allow(""),
    rating: Joi.array()
        .allow(""),
    language: Joi.array()
        .allow(""),
    cover: Joi.string()
        .allow(""),
    avatar: Joi.string()
        .allow(""),
    web: Joi.string()
        .allow(""),
    discord: Joi.string()
        .allow(""),
    email: Joi.string()
        .allow(""),
    about: Joi.string()
        .allow(),
    isUploadMember: Joi.string()
        .allow("")
})


const createAndUpdate = schema.keys({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .required()
        .min(3)
        .max(200),
    userMemberID: Joi.array()
        .allow(""),
    mangaID: Joi.array()
        .allow(""),
    rating: Joi.array()
        .allow(""),
    language: Joi.array()
        .allow(""),
    cover: Joi.string()
        .allow(""),
    avatar: Joi.string()
        .allow(""),
    web: Joi.string()
        .allow(""),
    discord: Joi.string()
        .allow(""),
    email: Joi.string()
        .allow(""),
    about: Joi.string()
        .allow(),
    isUploadMember: Joi.string()
        .allow("")
})

const uploadImage = schema.keys({
    id: Joi.number()
        .required()
})
export function validateCreateAndUpdateGroup(body) {
    return createAndUpdate.validate(body)
}
export function validateUploadImage(body) {
    return uploadImage.validate(body)
}