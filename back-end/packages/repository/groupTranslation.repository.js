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
export async function findByUserOwerId(id) {
    return GroupTranslationModel.find({ userOwerID: id })
}

/**
 * 
 * @param {Object} groupTranslationInfo 
 */
export async function create(groupTranslationInfo) {
    const groupTranslationClass = new GroupTranslationModel(groupTranslationInfo)
    return groupTranslationClass.save()
}