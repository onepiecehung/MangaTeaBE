import * as response from "../../util/response.json";
import * as MangaService from "./manga.service";

export async function find(req, res) {
    try {
        let data = await MangaService.find(req.query)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}