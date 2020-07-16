const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userId = new Schema({
    userID: { type: Number }
}, {
    timestamps: true,
})

module.exports = mongoose.model('userId', userId);