import { uploadImgBB } from "../middleware/upload.imgbb";
import { uploadImgur } from "../middleware/upload.imgur";
import { uploadImageKIT } from "../middleware/upload.imagekit";
import * as ChapterService from "./chapter.service";
import * as ChapterValidator from "./chapter.validation";
import * as response from "../../util/response.json";
import * as logger from "../../util/logger";
import { JOB_NAME } from "../../globalConstant/index";

export async function find(req, res) {
    try {
        let data = await ChapterService.find(req.query, req.user);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}


export async function createAndUpdate(req, res) {
    req.setTimeout(500000);
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
                    let urlImage = await uploadImageKIT(element.buffer, `${req.body.mangaID}-${req.body.chapterNumber}-${element.originalname}`);
                    dataArray.push(urlImage.url);
                    logger.info(`${element.originalname} => ${urlImage.url}`);
                }
                req.body.photo = dataArray;
                req.body.photoKIT = dataArray;
            }
        }
        let data = await ChapterService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}