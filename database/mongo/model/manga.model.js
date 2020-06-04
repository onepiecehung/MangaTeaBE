const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const AuthorAndArtistModel = require("./author.model")
// const GroupTranslateModel = require("./groupTranslation.model")
// const GenreModel = require("./genre.model")
// const RatingModel = require("./rating.model")
// const StatusModel = require("./status.model")
// const ChapterModel = require("./chapter.model")
// const PermissionModel = require("./permission.model")

const MangaSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    idAniList: {
        type: Number
    },
    idMal: {
        type: Number
    },
    otherName: {
        romaji: { type: String },
        english: { type: String },
        native: { type: String },
        userPreferred: { type: String },
    },
    author: [{
        type: mongoose.Schema.Types.String,
        ref: "Author_Artist"
    }],
    artist: [{
        type: mongoose.Schema.Types.String,
        ref: "Author_Artist"
    }],
    groupTranslationID: [{
        type: mongoose.Schema.Types.Number,
        ref: "GroupTranslation"
    }],
    createByUserID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users"
    },
    userFollowedID: [{
        type: mongoose.Schema.Types.Number,
        ref: "Users"
    }],
    coverImage: {
        large: { type: String },
        medium: { type: String }
    },
    bannerImage: {
        type: String
    },
    format: {
        type: String
    },
    countryOfOrigin: {
        type: String
    },
    characters: [{
        id: { type: Number },
        name: { type: String }
    }],
    externalLinks: [{
        type: String
    }],
    isAdult: {
        type: Boolean,
        default: false
    },
    averageScore: {
        type: Number
    },
    meanScore: {
        type: Number
    },
    popularity: {
        type: Number
    },
    trending: {
        type: Number
    },
    staff: [{
        id: { type: Number },
        name: { type: String }
    }],
    tags: [{
        name: { type: String },
        isMediaSpoiler: { type: Boolean, default: false }
    }],
    startDate: {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number }
    },
    endDate: {
        year: { type: Number },
        month: { type: Number },
        day: { type: Number }
    },
    genres: [{
        type: String
    }],
    rate: [{
        type: mongoose.Schema.Types.Number,
        ref: "Rating"
    }],
    status: {
        type: String
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"
    },
    description: { type: String, default: "Manga description" },
    source: [{
        type: String
    }],
    chapter: [{
        type: mongoose.Schema.Types.Number,
        ref: "Chapter"
    }],
    lastReadAt: {
        type: Date,
        default: Date.now()
    },
    totalChapter: { type: Number, default: 0 },
    view: { type: Number, default: 0 }
}, {
    timestamps: true,
})



MangaSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});






MangaSchema.plugin(autoIncrement.plugin, {
    model: 'Manga',
    startAt: 1
});
module.exports = mongoose.model('Manga', MangaSchema);