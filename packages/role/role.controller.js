import * as response from "../../util/response.json";
import * as RoleService from "./role.service";
import { ROLE } from "../../database/mongo/data/role.data";

export async function autoCreateAllRole(req, res) {
    try {
        let data = await RoleService.insertMultiple(ROLE)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}