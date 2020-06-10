import { uploadImgur } from "../middleware/upload.imgur";
import * as GroupTranslationService from "./groupTranslation.service";
import * as GroupTranslationValidator from "./groupTranslation.validation";
import * as response from "../../util/response.json";

export async function createAndUpdate(req, res) {
    try {
        let validateResult = GroupTranslationValidator.validateCreateAndUpdateGroup(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        let data = await GroupTranslationService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}


export async function find(req, res) {
    try {
        let data = await GroupTranslationService.find(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}

export async function upload(req, res) {
    try {
        if (!req.body.id) {
            return response.error(res, req, {
                message: "ID group is required"
            });
        }
        let update = {};
        if (req.files.avatar) {
            let urlAvatar = await uploadImgur(req.files.avatar[0].buffer);
            update.avatar = urlAvatar.data.link;
        }
        if (req.files.cover) {
            let urlCover = await uploadImgur(req.files.cover[0].buffer);
            update.cover = urlCover.data.link;
        }
        let data = await GroupTranslationService.upload(parseInt(req.body.id), req.user, update);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}