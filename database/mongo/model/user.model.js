import mongoose from 'mongoose';
import { CONFIG } from '../../../globalConstant'
const bcrypt = require("bcrypt");
const autoIncrement = require('mongoose-plugin-autoinc');
const moment = require("moment");
// const StatusModel = require("./status.model")
// const RoleModel = require("./role.model")
// const PermissionModel = require("./permission.model")
// const CountryModel = require("./country.model")
// const AppellationModel = require("./appellation.model")

const UserSchema = new mongoose.Schema({
    // index: { type: Number, unique: true, required: true },
    email: { type: String, required: true, unique: true, index: 1 },
    fullName: { type: String, },
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, },
    status: {
        type: mongoose.Schema.Types.String,
        ref: "Status",
        default: "INACTIVE"
    },
    role: {
        type: mongoose.Schema.Types.String,
        ref: "Role",
        default: "MEMBER"
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
        default: "MALE"
    },
    birthday: { type: Date },
    address: { type: String, default: "" },
    postalCode: { type: String },
    point: { type: Number, required: true, default: 0 },
    verifyPhone: { type: Boolean, default: false },
    verifyEmail: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    ip: { type: String },
    loginCount: { type: Number, default: 0 },
    lastLoginAt: { type: Date },
    avatar: { type: String },
    permission: [{
        type: Number
    }],
    fromCountry: {
        type: mongoose.Schema.Types.Number,
        ref: "Country"
        // default: "Unknown_ID"
    },
    appellation: [{
        type: mongoose.Schema.Types.Number,
        ref: "Appellation"
        // default: "Unknown_ID"
    }],
    about: {
        type: String,
        default: "Unknown"
    },
    linkSocial: [{
        type: String,
        default: "Unknown"
    }]
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    },
    toObject: {
        transform: function (doc, ret) {
            delete ret.password;
        }
    }
});

UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000)
        next(new Error('This user already exists, please try again'));
    else next(error);
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        let _this = this;
        return bcrypt.compareSync(password, _this.password);
    } catch (error) {
        throw new Error(error.message);
    }
};


UserSchema.pre('save', async function (next) {
    try {
        const _this = this;
        if (_this.isModified("password")) {
            const salt = bcrypt.genSaltSync(10);
            _this.password = bcrypt.hashSync(_this.password, salt);
        }

        if (_this.birthday && _this.isModified("birthday")) {
            if (_this.birthday && !moment(_this.birthday).isValid()) {
                return new Error(`DATE_INVALID`);
            }
            _this.birthday = new Date(moment(_this.birthday).utc());
        }
        next();
    } catch (error) {
        throw new Error(error.message);
    }
});

UserSchema.post('save', async function () {
    try {
        if (this.wasNew) {
            // new documents
        } else {
            // old documets
        }
        // elasticsearch
    } catch (error) {
        throw error;
    }
});

UserSchema.pre('remove', async function (next) {
    try {

    } catch (error) {
        console.error('error remove : ', error);
        throw error;
    }
});

UserSchema.statics.getMetaDataUser = async function (users) {
    try {
        let isArray = Array.isArray(users);
        if (!isArray) {
            users = [users];
        }
        let promise = users.map(async e => {
            if (e.avatar) {
                e.avatar = {
                    name: e.avatar,
                    url: `${URL_AVATAR}/${e.avatar}`
                }
            }
            return e;
        });
        let data = await Promise.all(promise);
        return isArray ? data : data[0];
    } catch (error) {
        console.error('error getMetaDataUser : ', error);
        throw error;
    }
}

UserSchema.methods.getJWT = function () {
    try {
        let _this = this;
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({ user_id: _this.id }, CONFIG.jwt_encryption, {
            expiresIn: expiration_time
        });
    } catch (err) {
        throw new Error(error.message);
    }
};

UserSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    // field: "indexID",
    startAt: 10
});


module.exports = mongoose.model('Users', UserSchema);
