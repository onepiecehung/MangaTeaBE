const UserAnalyzeModel = require("../../database/mongo/model/userAnalyze.model");

export async function save(userAnalyzeInfo) {
    return userAnalyzeInfo.save()
}

export async function create(userAnalyzeInfo) {
    const userAnalyzeClass = new UserAnalyzeModel(userAnalyzeInfo);
    return userAnalyzeClass.save();
}


export async function findById(id) {
    return UserAnalyzeModel.findById(id)
}


export async function findByIdAndUpdate(id, update) {
    return UserAnalyzeModel.findByIdAndUpdate(id, update)
}

export async function find(filters, limit, skip, sort) {
    return UserAnalyzeModel.find(filters ? filters : {}).limit(limit ? limit : 0).skip(skip ? skip : 0);
}

export async function countDocuments(filters) {
    return UserAnalyzeModel.countDocuments(filters);
}

export async function findAdv(filters, limit, skip, sort) {
    return UserAnalyzeModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip);
}