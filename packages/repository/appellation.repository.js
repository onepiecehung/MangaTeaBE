const AppellationModel = require("../../database/mongo/model/appellation.model")


/**
 * 
 * @param {Object} appellationInfo 
 */
export async function create(appellationInfo) {
    const roleClass = new AppellationModel(appellationInfo)
    return roleClass.save()
}


/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return AppellationModel.findOne({ name: name })
}


/**
 * 
 * @param {Number} code 
 */
export async function findByName(code) {
    return AppellationModel.findOne({ code: code })
}