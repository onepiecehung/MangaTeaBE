const mongoose = require("mongoose")
const autoIncrement = require("mongoose-plugin-autoinc")
const Schema = mongoose.Schema;
// const UserModel = require("./user.model")
// const GroupTranslationModel = require("./groupTranslation.model")
// const StatusModel = require("./status.model")
// const PermissionModel = require("./permission.model")
// const MangaModel = require("./manga.model")
// const LangaugeModel = require("./country.model")


const ChapterSchema = new Schema({
    name: {
        type: String,
        default: "Unknown name",
        required: true
    },
    chapterNumber: {
        type: Number,
        required: true,
        default: 0
    },
    uploadBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
    },
    groupTranslation: {
        type: mongoose.Schema.Types.String,
        ref: "GroupTranslation"
    },
    langauge: {
        type: mongoose.Schema.Types.Number,
        ref: "Country"
    },
    photo: [{
        type: String
    }],
    view: {
        type: Number,
        default: 0
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: "Manga"
    },
    status: {
        type: mongoose.Schema.Types.String,
        ref: "Status"
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"
    },
    lastReadAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
})




ChapterSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This doccument is already exists, please try again'));
    else next(error);
});





ChapterSchema.plugin(autoIncrement.plugin, {
    model: 'Chapter',
    startAt: 1
});

module.exports = mongoose.model('Chapter', ChapterSchema);