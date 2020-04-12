const AuthorModel = require("../../database/mongo/model/author.model")






/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return AuthorModel.find({ name: name })
}