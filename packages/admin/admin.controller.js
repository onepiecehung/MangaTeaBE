import * as AdminService from "./admin.service";
import * as response from "../../util/response.json";

export async function dashboard(req, res) {
    try {
        let data = await AdminService.dashboard(req.query);
        return response.success(res, data, 200);
    } catch (error) {
        return response.error(res, req, error);
    }
}