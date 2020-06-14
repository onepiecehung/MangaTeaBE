import * as response from "../../util/response.json";
import { uploadImgur } from "../middleware/upload.imgur";
import * as ChapterService from "./chapter.service";
import * as ChapterValidator from "./chapter.validation";

export async function find(req, res) {
    try {
        let data = await ChapterService.find(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}


export async function createAndUpdate(req, res) {
    try {
        let validateResult = ChapterValidator.validateCreateAndUpdate(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        if (req.files) {
            if (req.files.image) {
                let dataArray = [];
                for (const element of req.files.image) {
                    let urlImage = await uploadImgur(element.buffer);
                    dataArray.push(urlImage.data.link);
                }
                req.body.photo = dataArray;
                req.body.photoImgur = dataArray;
            }
        }
        let data = await ChapterService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}