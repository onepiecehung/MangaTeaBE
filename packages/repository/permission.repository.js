const PermissionModel = require("../../database/mongo/model/permission.model")


/**
 * 
 * @param {Object} permissionInfo 
 */
export async function create(permissionInfo) {
    const permissionClass = new PermissionModel(permissionInfo)
    return permissionClass.save()
}


/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return PermissionModel.findOne({ name: name })
}


/**
 * 
 * @param {Number} code 
 */
export async function findByName(code) {
    return PermissionModel.findOne({ code: code })
}