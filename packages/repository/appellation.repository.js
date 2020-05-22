const AppellationModel = require("../../database/mongo/model/appellation.model")


/**
 * 
 * @param {Object} appellationInfo 
 */
export async function create(appellationInfo) {
    const roleClass = new AppellationModel(appellationInfo);
    return roleClass.save();
}

export async function save(appellationInfo) {
    return appellationInfo.save();
}

export async function findOne(filter) {
    return AppellationModel.find(filter);
}

export async function findByIdAndUpdate(id, update) {
    return AppellationModel.findByIdAndUpdate(id, update);
}

export async function findById(id) {
    return AppellationModel.findById(id);
}

export async function find(filters, skip, limit, sort, populate) {
    return (populate === false ? AppellationModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort) : AppellationModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort).populate("createBy updateBy"))
}

export async function countDocuments(filters) {
    return AppellationModel.countDocuments(filters.length ? { $and: filters } : {})
}
/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return AppellationModel.findOne({ name: name });
}


/**
 * 
 * @param {Number} code 
 */
export async function findByCode(code) {
    return AppellationModel.findOne({ code: code });
}