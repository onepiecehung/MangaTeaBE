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
export async function findByName(code) {
    return RoleModel.findOne({ code: code })
}