const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-plugin-autoinc');

const RoleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    code: { type: Number, required: true, unique: true },
    detail: { type: String, required: true},
}, {
    timestamps: true,
})
RoleSchema.plugin(autoIncrement.plugin, {
    model: 'Role',
    startAt: 1
});
module.exports = mongoose.model('Role', RoleSchema);