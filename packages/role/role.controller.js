const response = require("../../util/response.json")
const RoleService = require("./role.service")
const { ROLE } = require("../../database/mongo/data/role.data")

export async function autoCreateAllRole(req, res) {
    try {
        let data = await RoleService.insertMultiple(ROLE)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}