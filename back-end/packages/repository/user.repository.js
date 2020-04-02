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