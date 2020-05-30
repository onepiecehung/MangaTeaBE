const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const AppellationSchema = new Schema({
    name: { type: String, required: true },
    code: { type: Number, required: true },
    type: { type: String, required: true },
    createBy: { type: mongoose.Schema.Types.Number, ref: "Users" },
    updateBy: { type: mongoose.Schema.Types.Number, ref: "Users" },
    detail: { type: String, required: true },
}, {
    timestamps: true,
})




AppellationSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This document is already exists, please try again'));
    else next(error);
});







AppellationSchema.plugin(autoIncrement.plugin, {
    model: 'Appellation',
    startAt: 1
});
module.exports = mongoose.model('Appellation', AppellationSchema);