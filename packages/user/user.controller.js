const response = require("../../util/response.json")
const UserValidator = require("./user.validation")
const UserService = require("./user.service")
const utils = require("../../util/help")
// const Redis = require("../../database/redis/client")

export async function Register(req, res) {
    try {
        let validateResult = UserValidator.validateRegister(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await UserService.Register(req.body)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function Login(req, res) {
    try {
        let validateResult = UserValidator.validateLogin(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await UserService.Login(req.body, (utils.getClientIp() ? utils.getClientIp() : utils.getIP(req)))
        return response.success(res, data)
    } catch (error) {
        return response.error(res, req, error)
    }
}


export async function Profile(req, res) {
    try {
        return response.success(res, req.user)
    } catch (error) {
        return response.error(res, req, error)
    }
}


export async function getUserById(req, res) {
    try {
        // const myKey = "UserInfo:" + req.params.id;
        // const value = await Redis.getJson(myKey);
        // if (value) {
        //     return response.success(res, value);
        // }
        let data = await UserService.getUserById(req.params.id)
        // await Redis.setJson(myKey, data);
        return response.success(res, data)
    } catch (error) {
        return response.error(res, req, error)
    }
}