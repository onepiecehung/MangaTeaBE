import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { USER_ERROR, CONFIG, JOB_NAME } from "../../globalConstant/index";
import * as logger from "../../util/logger";
import RABBIT from "../../server/connector/rabbitmq/init/index"

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
        await RABBIT.sendDataToRabbit(JOB_NAME.SEND_EMAIL_REG, {
            email: data.email,
            fullName: (data.fullName) ? data.fullName : data.username,
            urlActive: "Url is not available."
        })
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}



/**
 * 
 * @param {*} user 
 */
async function generateToken(user) {
    try {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return jwt.sign({ _id: user._id, role: user.role }, CONFIG.jwt_encryption, {
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