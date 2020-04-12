const StatusModel = require("../../database/mongo/model/status.model")

/**
 * 
 * @param {Object} statusInfo 
 */
export async function create(statusInfo) {
    const statusClass = new StatusModel(statusInfo);
    return statusClass.save()
}

/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return StatusModel.findOne({ name: name })
}


/**
 * 
 * @param {Number} code 
 */
export async function findByCode(code) {
    return StatusModel.findOne({ code: code })
}


/**
 * 
 * @param {ArrayObject} statusInfoArray 
 */
export async function createMultiple(statusInfoArray) {
    return await StatusModel.insertMany(statusInfoArray)
}