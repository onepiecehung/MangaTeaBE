import * as AppellationService from "./appellation.service";
import * as AppellationValidator from "./appellation.validation";
import * as response from "../../util/response.json";

export async function createAndUpdate(req, res) {
    try {
        let validateResult = AppellationValidator.validateCreateAppellation(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await AppellationService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}

export async function find(req, res) {
    try {
        let data = await AppellationService.find(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}