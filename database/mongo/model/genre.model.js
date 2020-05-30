const mongoose = require("mongoose")
const autoIncrement = require("mongoose-plugin-autoinc")
const Schema = mongoose.Schema;
// const UserModel = require("./user.model")

const GenreSchema = new Schema({
    name: {
        type: String,
        default: "Unknown name",
        require: true
    },
    description: {
        type: String,
        default: "Unknown detail",
        require: true,
    },
    code: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        default: "#CAF0FF"
    },
    nsfw: {
        type: Boolean,
        default: false
    },
    createBy: {
        type: mongoose.Schema.Types.Number,
        ref: "Users",
        default: 1
    },
}, {
    timestamps: true
})



GenreSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});




GenreSchema.plugin(autoIncrement.plugin, {
    model: 'GenreSchema',
    startAt: 1
});

module.exports = mongoose.model('Genre', GenreSchema);