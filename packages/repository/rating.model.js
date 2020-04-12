const RatingModel = require("../../database/mongo/model/rating.model")



/**
 * 
 * @param {Number} id 
 */
export async function findRatingByMangaId(id) {
    return RatingModel.find({ mangaID: id })
}


/**
 * 
 * @param {Number} id 
 */
export async function findRatingByGroupTranlationId(id) {
    return RatingModel.find({ groupTranslationID: id })
}


/**
 * 
 * @param {Number} id 
 */
export async function findRatingByUserId(id) {
    return RatingModel.find({ userID: id })
}