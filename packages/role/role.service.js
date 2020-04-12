const RoleRepository = require("../repository/role.repository")
const logger = require("../../util/logger")

export async function insertMultiple(roleInfoArray) {
    try {
        let data = await RoleRepository.createMultiple(roleInfoArray)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}