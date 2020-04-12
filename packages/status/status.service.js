const StatusRepository = require("../repository/status.repository")
const logger = require("../../util/logger")
const { CODE_ERROR } = require("../../globalConstant/index")

export async function create(statusInfo) {
    try {
        let checkNameStatus = await StatusRepository.findByName(statusInfo.name)
        if (checkNameStatus) {
            return Promise.reject(CODE_ERROR.NAME_STATUS_IS_ALREADY)
        }
        let checkCodeStatus = await StatusRepository.findByCode(statusInfo.code)
        if (checkCodeStatus) {
            return Promise.reject(CODE_ERROR.CODE_STATUS_IS_ALREADY)
        }
        let data = await StatusRepository.create(statusInfo)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function insertMultiple(statusInfoArray) {
    try {
        let data = await StatusRepository.createMultiple(statusInfoArray)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}