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
    const groupTranslationClass = new GroupTranslationModel(groupTranslationInfo);
    return groupTranslationClass.save();
}

export async function findByIdAndUpdate(id, update) {
    return GroupTranslationModel.findByIdAndUpdate(id, update);
}

export async function findOne(filters) {
    return GroupTranslationModel.findOne(filters);
}

export async function find(filters, skip, limit, sort, populate) {
    return (populate === false ? GroupTranslationModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort) : GroupTranslationModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort).populate([{path:'userOwnerID', select:'username'}, {path:'language', select:'alpha2Code'},{path:'updateBy', select:'username'},{path:'createBy', select:'username'}]).lean())
}

export async function countDocuments(filters) {
    return GroupTranslationModel.countDocuments(filters.length ? { $and: filters } : {});
}

export async function findByIdAndPopulate(id, populate) {
    return (populate === false ? GroupTranslationModel.findById(id) : GroupTranslationModel.findById(id).populate([{path:'userOwnerID', select:'username'}, {path:'language', select:'alpha2Code'},{path:'updateBy', select:'username'},{path:'createBy', select:'username'}]).lean());
}

export async function addChapter(idGroup, idChapter) {
    return GroupTranslationModel.updateOne({ _id: idGroup }, { $push: { chapterID: idChapter } })
}


export async function getNameAndId(id) {
    return GroupTranslationModel.findOne({ _id: id }, {
        name: 1
    })
}