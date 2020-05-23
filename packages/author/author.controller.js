import * as AuthorService from "./author.service";
import * as AuthorValidator from "./author.validation";
import * as response from "../../util/response.json";

export async function createAndUpdate(req, res) {
    try {
        let validateResult = AuthorValidator.validateCreateAndUpdate(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await AuthorService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}



export async function find(req, res) {
    try {
        let data = await AuthorService.find(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}