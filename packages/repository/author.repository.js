const AuthorModel = require("../../database/mongo/model/author.model")

/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return AuthorModel.find({ name: name })
}


export async function save(authorInfo) {
    return authorInfo.save()
}


export async function create(authorInfo) {
    const authorClass = new AuthorModel(authorInfo);
    return authorClass.save();
}

export async function findById(id) {
    return AuthorModel.findById(id);
}

export async function find(filters, skip, limit, sort, populate) {
    return (populate === false ? AuthorModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort) : AuthorModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort).populate("createBy updateBy"))
}


export async function countDocuments(filters) {
    return AuthorModel.countDocuments(filters);
}

export async function findOne(filter) {
    return AuthorModel.findOne(filter);
}

export async function findByIdAndUpdate(id, update) {
    return AuthorModel.findByIdAndUpdate(id, update);
}
