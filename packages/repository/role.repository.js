const RoleModel = require("../../database/mongo/model/role.model")


/**
 * 
 * @param {Object} roleInfo 
 */
export async function create(roleInfo) {
    const roleClass = new RoleModel(roleInfo)
    return roleClass.save()
}


/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return RoleModel.findOne({ name: name })
}


/**
 * 
 * @param {Number} code 
 */
export async function findByCode(code) {
    return RoleModel.findOne({ code: code })
}


/**
 * 
 * @param {ArrayObject} roleInfoArray 
 */
export async function createMultiple(roleInfoArray) {
    return await RoleModel.insertMany(roleInfoArray)
}