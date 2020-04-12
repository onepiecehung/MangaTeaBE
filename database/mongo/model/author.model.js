const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');
// const CountryModel = require("./country.model")
// const RoleModel = require("./role.model")
// const MangaModel = require("./manga.model")

const Author_ArtistSchema = new Schema({
    name: { type: String, required: true, unique: true },
    manga: [{
        type: mongoose.Schema.Types.Number,
        ref: "Manga"
    }],
    role: {
        type: mongoose.Schema.Types.String,
        ref: "Role"
    },
    country: [{
        type: mongoose.Schema.Types.Number,
        ref: "Country"
    }],
    sex: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    about: {
        type: String,
        default: "Write some about author/artist"
    },
    brithday: {
        type: Date
    },
    socail: {
        type: String
    }
}, {
    timestamps: true,
})




Author_ArtistSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This doccument is already exists, please try again'));
    else next(error);
});







Author_ArtistSchema.plugin(autoIncrement.plugin, {
    model: 'Author_Artist',
    startAt: 1
});
module.exports = mongoose.model('Author_Artist', Author_ArtistSchema);