const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const StatusSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    detail: { type: String, required: true },
}, {
    timestamps: true,
})


StatusSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This doccument is already exists, please try again'));
    else next(error);
});


StatusSchema.plugin(autoIncrement.plugin, {
    model: 'Status',
    startAt: 1
});
module.exports = mongoose.model('Status', StatusSchema);