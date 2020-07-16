const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userData = new Schema({
    email: { type: String },
    fullName: { type: String },
    country: { type: Number },
    gender: { type: String },
}, {
    timestamps: true,
})
// mongoose.connect("mongodb://localhost:27017/truyentranh")
module.exports = mongoose.model('userData', userData);