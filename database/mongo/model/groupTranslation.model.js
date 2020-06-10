const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const RatingModel = require("./rating.model")
// const CountryModel = require("./country.model")
// const StatusModel = require("./status.model")
// const PermissionModel = require("./permission.model")
// const MangaModel = require("./manga.model")

const GroupTranslationSchema = new Schema({
    name: { type: String, required: true },
    userOwnerID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: true
    },
    userMemberID: [{
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        default: [],
    }],
    mangaID: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
    chapterID: [{
        type: mongoose.Schema.Types.Number,
        ref: "Chapter",
        default: []
    }],
    rating: [{
        type: mongoose.Schema.Types.Number,
        ref: "Rating",
        default: []
    }],
    language: [{
        type: mongoose.Schema.Types.Number,
        ref: "Country",
        default: []
    }],
    cover: { type: String, default: "" },
    avatar: { type: String, default: "" },
    web: { type: String, default: "" },
    discord: { type: String, default: "" },
    email: { type: String, default: "" },
    about: { type: String, default: "About your group" },
    status: {
        type: mongoose.Schema.Types.Number,
        ref: "Status"
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"
    },
    isUploadMember: { type: Boolean, default: true },
    createBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users"
    },
    updateBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users"
    },
    view: { type: Number, default: 0 }
}, {
    timestamps: true,
})



GroupTranslationSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});


GroupTranslationSchema.plugin(autoIncrement.plugin, {
    model: 'GroupTranslation',
    startAt: 1
});
module.exports = mongoose.model('GroupTranslation', GroupTranslationSchema);