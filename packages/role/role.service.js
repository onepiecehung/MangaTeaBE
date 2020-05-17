import * as logger from "../../util/logger";

import * as RoleRepository from "../repository/role.repository";

export async function insertMultiple(roleInfoArray) {
    try {
        let data = await RoleRepository.createMultiple(roleInfoArray)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}