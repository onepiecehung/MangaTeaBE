const UserRepository = require("../repository/user.repository")
const MemberRepository = require("../repository/member.repository")
const logger = require("../../util/logger")
const { USER_ERROR, CONFIG } = require("../../globalConstant/index")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")





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