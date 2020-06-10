
import * as utils from "../../util/help";

import { uploadImgur } from "../middleware/upload.imgur";
import * as response from "../../util/response.json";
import * as UserService from "./user.service";
import * as UserValidator from "./user.validation";

// const Redis from  "../../database/redis/client")

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

export async function changePassword(req, res) {
    try {
        let validateResult = UserValidator.validateChangePassword(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await UserService.changePassword(req.body, req.user)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function uploadAvatar(req, res) {
    try {
        let url_ava = await uploadImgur(req.file.buffer);
        let data = await UserService.uploadAvatar(req.user, url_ava.data.link)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function updateProfile(req, res) {
    try {
        let validateResult = UserValidator.validateUpdateProfile(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await UserService.updateProfile(req.user, req.body)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}