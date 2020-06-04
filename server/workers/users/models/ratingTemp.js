const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const rating2 = new Schema({
    userID: { type: Number },
    posterID: { type: Number },
    rating: { type: String },
}, {
    timestamps: true,
})
// mongoose.connect("mongodb://localhost:27017/truyentranh")
module.exports = mongoose.model('rating2', rating2);