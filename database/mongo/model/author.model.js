const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const CountryModel = require("./country.model")
// const RoleModel = require("./role.model")
// const MangaModel = require("./manga.model")

const Author_ArtistSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, default: "https://i.imgur.com/pCH9w6H.png" },
    manga: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga",
        default: []
    }],
    role: {
        type: mongoose.Schema.Types.String,
        ref: "Role",
        default: "AUTHOR"
    },
    country: {
        type: mongoose.Schema.Types.String,
        ref: "Country",
        default: "Japan"
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
        default: "MALE"
    },
    about: {
        type: String,
        default: "Write some about author/artist"
    },
    birthday: {
        type: Date
    },
    social: {
        type: String
    },
    createBy: { type: mongoose.Schema.Types.Number, ref: "Users" },
    updateBy: { type: mongoose.Schema.Types.Number, ref: "Users" },
}, {
    timestamps: true,
})




Author_ArtistSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});







Author_ArtistSchema.plugin(autoIncrement.plugin, {
    model: 'Author_Artist',
    startAt: 1
});
module.exports = mongoose.model('Author_Artist', Author_ArtistSchema);