var mongoose = require("mongoose")
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const UserModel = require("./user.model")
// const ChapterModel = require("./chapter.model")
// const MangaModel = require("./manga.model")

var MemberSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: true,
        unique: true,
        index: true
    },
    chapterUpload: [{
        type: mongoose.Schema.Types.Number,
        ref: "Chapter",
        default: []
    }],
    mangaUpload: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
    mangaSaved: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
    mangaFavorite: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
    historyReading: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
}, {
    timestamps: true,

})





MemberSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});






MemberSchema.plugin(autoIncrement.plugin, {
    model: 'Member',
    startAt: 10
});
module.exports = mongoose.model('Member', MemberSchema);