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
        ref: "Chapter"
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: "Manga"
    },
    groupTranslationID: {
        type: mongoose.Schema.Types.Number,
        ref: "GroupTranslation"
    },
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users"
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
    reply: [{
        type: mongoose.Schema.Types.Number,
        ref: 'Comment'
    }]
}, {
    timestamps: true,
})




CommentSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This doccument is already exists, please try again'));
    else next(error);
});







CommentSchema.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1
});
module.exports = mongoose.model('Comment', CommentSchema);