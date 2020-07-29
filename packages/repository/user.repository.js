const UserModel = require("../../database/mongo/model/user.model")

export async function save(userInfo) {
    return userInfo.save()
}

export async function create(userInfo) {
    const userClass = new UserModel(userInfo);
    return userClass.save();
}

export async function findByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase() })
}

export async function findByUsername(username) {
    return UserModel.findOne({ username: username })
}

export async function checkPassword(password) {
    return UserModel.comparePassword(password)
}

export async function findById(id) {
    return UserModel.findById(id)
}

export async function changePassword(id, data) {
    return UserModel.findByIdAndUpdate(id, { password: data.newPassword })
}

export async function findByIdAndUpdate(id, update) {
    return UserModel.findByIdAndUpdate(id, update)
}

export async function getUsernameAndId(id) {
    return UserModel.findOne({
        _id: id
    }, {
        username: 1,
        _id: 1
    })
}

export async function countDocuments(filters) {
    return UserModel.countDocuments(filters);
}