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
        default: -1
    },
    createBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
    },
    updateBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
    },
    groupTranslation: {
        type: mongoose.Schema.Types.Number,
        ref: "GroupTranslation",
        default: 0
    },
    language: {
        type: mongoose.Schema.Types.Number,
        ref: "Country"
    },
    photo: [{
        type: String
    }],
    photoImgur: [{
        type: String
    }],
    photoDrive: [{
        type: String
    }],
    photoAw3: [{
        type: String
    }],
    photoKIT: [{
        type: String
    }],
    view: {
        type: Number,
        default: 0
    },
    mangaID: {
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        required: true
    },
    status: {
        type: mongoose.Schema.Types.String,
        ref: "Status",
        default: "RELEASE"
    },
    permission: {
        type: mongoose.Schema.Types.Number,
        ref: "Permission"
    },
    uploadAt: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, e) {
            delete e.photoKIT;
            delete e.photoDrive;
            delete e.photoImgur;
            delete e.photoAw3;
        }
    },
    toObject: {
        transform: function (doc, e) {
            delete e.photoKIT;
            delete e.photoDrive;
            delete e.photoImgur;
            delete e.photoAw3;
        }
    }
})




ChapterSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});





ChapterSchema.plugin(autoIncrement.plugin, {
    model: 'Chapter',
    startAt: 1
});

module.exports = mongoose.model('Chapter', ChapterSchema);