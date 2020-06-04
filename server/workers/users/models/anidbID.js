const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const anidbID = new Schema({
    item: { type: Number },
    anidb_aid: { type: Number },
}, {
    timestamps: true,
})

module.exports = mongoose.model('anidbID', anidbID);