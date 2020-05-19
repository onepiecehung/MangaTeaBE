import * as CommentService from "./comment.service";
import * as CommentValidator from "./comment.validation";
import * as response from "../../util/response.json";

export async function createAndUpdate(req, res) {
    try {
        let validateResult = CommentValidator.validateCreateAndUpdate(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        req.body.userID = req.user._id;
        let data = await CommentService.createAndUpdate(req.body, req.query)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function find(req, res) {
    try {
        let data = await CommentService.find(req.query)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}