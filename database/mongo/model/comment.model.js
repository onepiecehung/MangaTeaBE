const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const ChapterModel = require("./chapter.model")
// const MangaModel = require("./manga.model")
// const GroupTranslationModel = require("./groupTranslation.model")

const CommentSchema = new Schema({
    chapterID: {
        type: mongoose.Schema.Types.Number,
        ref: "Chapter",
        index: true
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        index: true
    },
    groupTranslationID: {
        type: mongoose.Schema.Types.Number,
        ref: "GroupTranslation",
        index: true
    },
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: true,
        index: true
    },
    commentContent: {
        type: String,
        required: true,
        max: [10000, "Max comment 10000 words"]
    },
    status: {
        type: Boolean,
        default: true
    },
    isEdit: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        index: true,
        required: true
    },
    reply: [{
        type: mongoose.Schema.Types.Number,
        ref: 'Comment',
        default: []
    }]
}, {
    timestamps: true,
})




CommentSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});







CommentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1
});
module.exports = mongoose.model('Comment', CommentSchema);