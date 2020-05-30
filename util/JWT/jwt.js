import jwt from "jsonwebtoken";
import * as response from "../../util/response.json";
import { CONFIG } from "../../globalConstant/index";
import { CODE } from "../../globalConstant/error";
import * as UserRepository from "../../packages/repository/user.repository";




function getToken(headers) {
    if (headers && headers.authorization || headers['x-access-token']) {
        let token = headers.authorization || headers['x-access-token'];
        if (token.startsWith(`manga `)) {
            token = token.slice(6, token.length);
            return token
        } else {
            return token
        }
    } else {
        return null
    }
}

export async function Authentication(req, res, next) {
    let token = getToken(req.headers)
    if (token) {
        jwt.verify(token, CONFIG.jwt_encryption, async (error, decoded) => {
            if (error) {
                return response.error(res, req, error, 403)
            } else {
                req.user = await UserRepository.findById(decoded._id)
                next()
            }
        })
    } else {
        return response.error(res, req, CODE.TOKEN_HAS_EXPIRED, 403)
    }
}

export async function AuthenticationPermission(req, res, next) {
    let token = getToken(req.headers)
    if (token) {
        jwt.verify(token, CONFIG.jwt_encryption, async (error, decoded) => {
            if (error) {
                return response.error(res, req, error, 403)
            } else {
                req.user = await UserRepository.findById(decoded._id);
                if (req.user.role === "ADMIN" || req.user.role === "ROOT" || req.user.permission.includes(777) === true) {
                    next()
                } else {
                    return response.error(res, req, CODE.PERMISSION_DENIED, 403);
                }
            }
        })
    } else {
        return response.error(res, req, CODE.TOKEN_HAS_EXPIRED, 403);
    }
}