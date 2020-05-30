import { STATUS } from "../../database/mongo/data/status.data";
import * as response from "../../util/response.json";
import * as StatusService from "./status.service";
import * as StatusValidator from "./status.validation";

export async function create(req, res) {
    try {
        let validateResult = StatusValidator.validateCreateStatus(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await StatusService.create(req.body)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}


export async function autoCreateAllStatus(req, res) {
    try {
        let data = await StatusService.insertMultiple(STATUS)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}