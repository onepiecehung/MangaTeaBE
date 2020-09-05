import mongoose, { model } from "mongoose";
const autoIncrement = require('mongoose-plugin-autoinc');


const UserAnalyzeSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    Action: {
        type: Number
    },
    Adventure: {
        type: Number
    },
    Cars: {
        type: Number
    },
    Comedy: {
        type: Number
    },
    Dementia: {
        type: Number
    },
    Demons: {
        type: Number
    },
    Drama: {
        type: Number
    },
    Ecchi: {
        type: Number
    },
    Fantasy: {
        type: Number
    },
    Game: {
        type: Number
    },
    Harem: {
        type: Number
    },
    Hentai: {
        type: Number
    },
    Historical: {
        type: Number
    },
    Horror: {
        type: Number
    },
    Josei: {
        type: Number
    },
    Kids: {
        type: Number
    },
    Magic: {
        type: Number
    },
    MartialArts: {
        type: Number
    },
    Mecha: {
        type: Number
    },
    Military: {
        type: Number
    },
    Music: {
        type: Number
    },
    Mystery: {
        type: Number
    },
    Parody: {
        type: Number
    },
    Police: {
        type: Number
    },
    Psychological: {
        type: Number
    },
    Romance: {
        type: Number
    },
    Samurai: {
        type: Number
    },
    School: {
        type: Number
    },
    SciFi: {
        type: Number
    },
    Seinen: {
        type: Number
    },
    Shoujo: {
        type: Number
    },
    ShoujoAi: {
        type: Number
    },
    Shounen: {
        type: Number
    },
    ShounenAi: {
        type: Number
    },
    SliceOfLife: {
        type: Number
    },
    Space: {
        type: Number
    },
    Sports: {
        type: Number
    },
    SuperPower: {
        type: Number
    },
    Supernatural: {
        type: Number
    },
    Thriller: {
        type: Number
    },
    Vampire: {
        type: Number
    },
    Yaoi: {
        type: Number
    },
    Yuri: {
        type: Number
    },
    Travel: {
        type: Number
    }
});

UserAnalyzeSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This user analyze already exists, please try again'));
    else next(error);
});


UserAnalyzeSchema.plugin(autoIncrement.plugin, {
    model: "UserAnalyze",
    startAt: 10
})

module.exports = mongoose.model("UserAnalyze", UserAnalyzeSchema);