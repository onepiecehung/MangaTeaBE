const GroupTranslationModel = require("../../database/mongo/model/groupTranslation.model")



/**
 *  
 * @param {String} name 
 */
export async function findByName(name) {
    return GroupTranslationModel.find({ name: name })
}

/**
 * 
 * @param {Number} id 
 */
export async function findById(id) {
    return GroupTranslationModel.findById(id)
}

/**
 * 
 * @param {Number} id 
 */
export async function findByUserOwnerId(id) {
    return GroupTranslationModel.find({ userOwnerID: id })
}

/**
 * 
 * @param {Object} groupTranslationInfo 
 */
export async function create(groupTranslationInfo) {
    const groupTranslationClass = new GroupTranslationModel(groupTranslationInfo)
    return groupTranslationClass.save()
}