import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { USER_ERROR, CONFIG, JOB_NAME, URL_FE } from "../../globalConstant/index";
import * as logger from "../../util/logger";
import RABBIT from "../../server/connector/rabbitmq/init/index"
import Redis from "../../database/redis/client";

import * as MemberRepository from "../repository/member.repository";
import * as UserRepository from "../repository/user.repository";

/**
 * 
 * @param {*} userInfo 
 */

export async function Register(userInfo) {
    try {
        let UserEmail = await UserRepository.findByEmail(userInfo.email)
        if (UserEmail) {
            return Promise.reject(USER_ERROR.EMAIL_HAS_EXISTS);
        }
        let UserName = await UserRepository.findByUsername(userInfo.username)
        if (UserName) {
            return Promise.reject(USER_ERROR.USERNAME_HAS_EXISTS);
        }
        let data = await UserRepository.create(userInfo)
        await MemberRepository.create({ userID: data._id })
        let token = await generateTokenActivated({
            _id: data._id,
            email: data.email,
            access: `activated`
        })
        const myKey = "UserVerify:" + data._id;
        await Redis.setJson(myKey, token, 60 * 60 * 4);
        await RABBIT.sendDataToRabbit(JOB_NAME.SEND_EMAIL_REG, {
            email: data.email,
            fullName: (data.fullName) ? data.fullName : data.username,
            urlActive: `${URL_FE}activated?token=${token}`
        })
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {*} Object
 */
async function generateTokenActivated(object) {
    try {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign(object, CONFIG.jwt_encryption, {
            expiresIn: expiration_time
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * 
 * @param {*} user 
 */
async function generateToken(user) {
    try {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({
            _id: user._id,
            role: user.role,
            point: user.point || 0,
            permission: user.permission || 0
        }, CONFIG.jwt_encryption, {
            expiresIn: expiration_time
        });
    } catch (error) {
        throw new Error(error.message);
    }
}


/**
 * 
 * @param {*} loginInfo 
 * @param {*} ip 
 */
export async function Login(loginInfo, ip) {
    try {
        const userInfo = await UserRepository.findByEmail(loginInfo.email);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.EMAIL_NOT_EXISTS);
        }

        const passwordCorrect = await bcrypt.compareSync(loginInfo.password, userInfo.password);
        if (!passwordCorrect) {
            return Promise.reject(USER_ERROR.PASSWORD_INVALID);
        }
        userInfo.set("ip", ip);
        userInfo.set("loginCount", userInfo.loginCount ? userInfo.loginCount + 1 : 1);
        userInfo.set("lastLoginAt", new Date());
        await UserRepository.save(userInfo);
        const token = await generateToken(userInfo);
        return { user: userInfo, token: token };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

/**
 * 
 * @param {*} id 
 */
export async function getUserById(id) {
    try {
        let data = await UserRepository.findById(id)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function changePassword(data, userAuth) {
    try {
        const userInfo = await UserRepository.findById(userAuth._id);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        const passwordCorrect = await bcrypt.compareSync(data.password, userInfo.password);
        if (!passwordCorrect) {
            return Promise.reject(USER_ERROR.PASSWORD_INVALID);
        }
        let salt = bcrypt.genSaltSync(10);
        data.newPassword = bcrypt.hashSync(data.newPassword, salt);
        await UserRepository.changePassword(userInfo._id, data);
        return true
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function resetPassword(data, userAuth) {
    try {
        const userInfo = await UserRepository.findById(userAuth._id);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        let salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(data.password, salt);
        await UserRepository.findByIdAndUpdate(userInfo._id, { password: data.password });
        return true
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function uploadAvatar(userAuth, url_ava) {
    try {
        const userInfo = await UserRepository.findById(userAuth._id);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        userInfo.set("avatar", url_ava)
        let user = await UserRepository.save(userInfo)
        return user
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function updateProfile(userAuth, userInfoUpdate) {
    try {
        const userInfo = await UserRepository.findById(userAuth._id);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        await UserRepository.findByIdAndUpdate(userAuth._id, userInfoUpdate)
        return true
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function verifyEmail(userAuth) {
    try {
        let userInfo = await UserRepository.findById(userAuth._id);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        let userInfo2 = await UserRepository.findByEmail(userAuth.email);
        if (!userInfo2) {
            return Promise.reject(USER_ERROR.EMAIL_NOT_EXISTS);
        }
        await UserRepository.findByIdAndUpdate(userAuth._id, {
            status: "ACTIVATED",
            verifyEmail: true
        })
        return true;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function forgotPassword(userAuth) {
    try {
        let userInfo = await UserRepository.findByEmail(userAuth.email);
        if (!userInfo) {
            return Promise.reject(USER_ERROR.EMAIL_NOT_EXISTS);
        }
        let token = await generateTokenActivated({
            _id: userInfo._id,
            email: userInfo.email,
            access: `forgotPassword`
        })
        const myKey = "UserForgotPass:" + userInfo._id;
        await Redis.setJson(myKey, token, 60 * 60);
        await RABBIT.sendDataToRabbit(JOB_NAME.FORGOT_PASSWORD, {
            email: userInfo.email,
            fullName: (userInfo.fullName) ? userInfo.fullName : userInfo.username,
            urlActive: `${URL_FE}resetPassword?token=${token}`
        })
        return { message: `We have just sent you an email to confirm.` }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}