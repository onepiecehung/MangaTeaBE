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
        required: true
    },
    author: [{
        type: mongoose.Schema.Types.Number,
        ref: "Author_Artist"
    }],
    artist: [{
        type: mongoose.Schema.Types.Number,
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
    cover: {
        type: String
    },
    genre: [{
        type: mongoose.Schema.Types.String,
        ref: "Genre"
    }],
    rate: [{
        type: mongoose.Schema.Types.Number,
        ref: "Rating"
    }],
    status: {
        type: mongoose.Schema.Types.Number,
        ref: "Status"
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"
    },
    descripttion: { type: String, default: "Manga descripttion" },
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
    }
}, {
    timestamps: true,
})



MangaSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This doccument is already exists, please try again'));
    else next(error);
});






MangaSchema.plugin(autoIncrement.plugin, {
    model: 'Manga',
    startAt: 1
});
module.exports = mongoose.model('Manga', MangaSchema);