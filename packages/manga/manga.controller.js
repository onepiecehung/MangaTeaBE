import { uploadImgur } from "../middleware/upload.imgur";
import * as MangaService from "./manga.service";
import * as MangaValidator from "./manga.validation";
import * as response from "../../util/response.json";


export async function findSuggestion(req, res) {
    try {
        if (!req.query.id) {
            return response.error(res, req, "ID manga is required!");
        }
        let data = await MangaService.findSuggestion(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}

export async function find(req, res) {
    try {
        let data = await MangaService.find(req.query, req.user);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}
export async function findAtHome(req, res) {
    try {
        let data = await MangaService.findAtHome(req.query, req.user);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}

export async function createAndUpdate(req, res) {
    try {
        // return response.success(res, req.body, 200);
        let validateResult = MangaValidator.validateCreateAndUpdate(req.body);
        if (validateResult.error) {
            return response.error(res, req, {
                message: validateResult.error.details[0].message
            });
        }
        if (req.files) {
            if (req.files.banner !== undefined && req.files.banner) {
                let urlBanner = await uploadImgur(req.files.banner[0].buffer);
                req.body.bannerImage = urlBanner.data.link;
            }
            if (req.files.cover !== undefined && req.files.cover) {
                let urlCover = await uploadImgur(req.files.cover[0].buffer);
                let tempJson = {};
                tempJson.large = urlCover.data.link;
                tempJson.medium = urlCover.data.link;
                // tempJson.imgur = urlCover.data.link;
                req.body.coverImage = tempJson;
            }
        }
        let data = await MangaService.createAndUpdate(req);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}


export async function deleteOne(req, res) {
    try {
        let data = await MangaService.deleteOne(req.query, req.user);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}