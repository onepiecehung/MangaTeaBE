import { RATING } from "../../globalConstant/index";

import * as RatingService from "./rating.service";
import * as RatingValidator from "./rating.validation";
import * as response from "../../util/response.json";

export async function create(req, res) {
    try {
        let validateResult = RatingValidator.validateCreateAndUpdate(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        if (!req.body.mangaID && !req.body.groupTranslationID || req.body.mangaID && req.body.groupTranslationID) {
            return response.error(res, req, {
                message: RATING.RATING_ID
            }, 403)
        }
        req.body.userID = req.user._id
        let data = await RatingService.create(req.body)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}