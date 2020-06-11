const Joi = require("@hapi/joi");

const schema = Joi.object({
    id: Joi.number()
        .allow(""),
    name: Joi.string()
        .allow(""),
    idAniList: Joi.number()
        .allow(""),
    idMal: Joi.number()
        .allow(""),
    otherName: Joi.object()
        .allow(""),
    author: Joi.array()
        .allow(""),
    artist: Joi.array()
        .allow(""),
    groupTranslationID: Joi.array()
        .allow(""),
    createBy: Joi.number()
        .allow(""),
    updateBy: Joi.number()
        .allow(""),
    userFollowedID: Joi.array()
        .allow(""),
    coverImage: Joi.object()
        .allow(""),
    bannerImage: Joi.string()
        .allow(""),
    format: Joi.string()
        .allow(""),
    countryOfOrigin: Joi.string()
        .allow(""),
    characters: Joi.array()
        .allow(""),
    externalLinks: Joi.array()
        .allow(""),
    isAdult: Joi.boolean()
        .allow(""),
    averageScore: Joi.number()
        .allow(""),
    meanScore: Joi.number()
        .allow(""),
    popularity: Joi.number()
        .allow(""),
    trending: Joi.number()
        .allow(""),
    staff: Joi.array()
        .allow(""),
    tags: Joi.array()
        .allow(""),
    startDate: Joi.object()
        .allow(""),
    endDate: Joi.object()
        .allow(""),
    genres: Joi.array()
        .allow(""),
    rate: Joi.array()
        .allow(""),
    status: Joi.string()
        .allow(""),
    permission: Joi.number()
        .allow(""),
    description: Joi.string()
        .allow(""),
    source: Joi.array()
        .allow(""),
    chapter: Joi.array()
        .allow(""),
    totalChapter: Joi.number()
        .allow(""),
    view: Joi.number()
        .allow(""),
})

const createAndUpdate = schema.keys({
    id: Joi.number()
        .allow(""),
    idAniList: Joi.number()
        .allow(""),
    idMal: Joi.number()
        .allow(""),
    otherName: Joi.object()
        .allow(""),
    author: Joi.array()
        .allow(""),
    artist: Joi.array()
        .allow(""),
    groupTranslationID: Joi.array()
        .allow(""),
    createBy: Joi.number()
        .allow(""),
    updateBy: Joi.number()
        .allow(""),
    userFollowedID: Joi.array()
        .allow(""),
    coverImage: Joi.object()
        .allow(""),
    bannerImage: Joi.string()
        .allow(""),
    format: Joi.string()
        .allow(""),
    countryOfOrigin: Joi.string()
        .allow(""),
    characters: Joi.array()
        .allow(""),
    externalLinks: Joi.array()
        .allow(""),
    isAdult: Joi.boolean()
        .allow(""),
    averageScore: Joi.number()
        .allow(""),
    meanScore: Joi.number()
        .allow(""),
    popularity: Joi.number()
        .allow(""),
    trending: Joi.number()
        .allow(""),
    staff: Joi.array()
        .allow(""),
    tags: Joi.array()
        .allow(""),
    startDate: Joi.object()
        .allow(""),
    endDate: Joi.object()
        .allow(""),
    genres: Joi.array()
        .allow(""),
    rate: Joi.array()
        .allow(""),
    status: Joi.string()
        .allow(""),
    permission: Joi.number()
        .allow(""),
    description: Joi.string()
        .allow(""),
    source: Joi.array()
        .allow(""),
    chapter: Joi.array()
        .allow(""),
    totalChapter: Joi.number()
        .allow(""),
    view: Joi.number()
        .allow(""),
})

export function validateCreateAndUpdate(body) {
    return createAndUpdate.validate(body);
}