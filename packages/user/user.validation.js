const Joi = require('@hapi/joi');

const schema = Joi.object({
    email: Joi.string()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
    username: Joi.string()
        .required()
        .min(6)
        .max(30),
    password: Joi.string()
        .required()
        .min(6)
        .max(30),
    fullName: Joi.string()
        .allow("")
        .min(1)
        .max(100),
    phoneNumber: Joi.string()
        .allow("")
        .min(10)
        .max(11),
    gender: Joi.string().allow("")
        .valid(...["MALE", "FEMALE", "OTHER"]),
    country: Joi.number(),
    // state: Joi.number().allow(''),
    // city: Joi.number().allow(''),
    address: Joi.string().allow(""),
    postalCode: Joi.string().allow(""),
    birthday: Joi.string().allow(""),
    identity: Joi.string()
        .allow("")
        .min(6)
        .max(20)
});

const registerSchema = schema.keys({
    email: Joi.string()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
    password: Joi.string()
        .required()
        .min(6)
        .max(30),
    username: Joi.string()
        .required()
        .min(6)
        .max(30),
    gender: Joi.string().allow("")
        .valid(...["MALE", "FEMALE", "OTHER"]),
    birthday: Joi.string().allow(""),

});

const loginSchema = Joi.object({
    email: Joi.string().trim()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
    username: Joi.string()
        .allow('')
        .min(6)
        .max(30),
    password: Joi.string()
        .required()
        .min(6)
        .max(30),
    token: Joi.string().allow('')
});


/**
 * TODO: update profile
 */
const updateProfile = Joi.object({
    fullName: Joi.string()
        .allow("")
        .min(1)
        .max(100),
    firstName: Joi.string()
        .allow("")
        .min(1)
        .max(100),
    lastName: Joi.string()
        .allow("")
        .min(1)
        .max(100),
    phoneNumber: Joi.string()
        .allow("")
        .min(10)
        .max(11),
    gender: Joi.string().allow("")
        .valid(...["MALE", "FEMALE", "OTHER"]),
    country: Joi.number(),
    // state: Joi.number().allow(''),
    // city: Joi.number().allow(''),
    address: Joi.string().allow(""),
    postalCode: Joi.string().allow(""),
    birthday: Joi.string().allow(""),
})

/**
 * TODO: change password
 * @param {*} body 
 */

const changePassword = Joi.object({
    password: Joi.string()
        .required()
        .min(6)
        .max(30),
    newPassword: Joi.string()
        .required()
        .min(6)
        .max(30),
});


/**
 * 
 * @param {*} body
 * @param body.email
 * 
 */
const checkEmail = Joi.object({
    email: Joi.string()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
});


/**
 * 
 * @param {*} body
 * @param body.password
 * @param body.confirmPassword
 * @param body.email
 * @param body.otp
 * 
 */
const resetPassword = Joi.object({
    email: Joi.string()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
    password: Joi.string()
        .required()
        .min(6)
        .max(30),
    confirmPassword: Joi.string()
        .required()
        .min(6)
        .max(30),
    otp: Joi.required()
})


/**
 * 
 * @param {*} body 
 * @param body.otp
 * @param body.email
 */

const OTP = Joi.object({
    email: Joi.string()
        .required()
        .regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i)
        .error(() => { throw new Error("Invalid email") }),
    otp: Joi.required()
})

function validateRegister(body) {
    return registerSchema.validate(body);
}

function validateLogin(body) {
    return loginSchema.validate(body);
}

function validateUpdateProfile(body) {
    return updateProfile.validate(body)
}

function validateChangePassword(body) {
    return changePassword.validate(body)
}

function validateCheckEmail(body) {
    return checkEmail.validate(body)
}

function validateResetPassword(body) {
    return resetPassword.validate(body)
}

function validateOTP(body) {
    return OTP.validate(body)
}
module.exports = {
    validateRegister,
    validateLogin,
    validateUpdateProfile,
    validateChangePassword,
    validateCheckEmail,
    validateResetPassword,
    validateOTP
};
