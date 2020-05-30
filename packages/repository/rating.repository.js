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
export async function findRatingByGroupTranslationId(id) {
    return RatingModel.find({ groupTranslationID: id })
}


/**
 * 
 * @param {Number} id 
 */
export async function findRatingByUserId(id) {
    return RatingModel.find({ userID: id })
}


/**
 * 
 * @param {Object} ratingInfo 
 */
export async function create(ratingInfo) {
    const ratingClass = new RatingModel(ratingInfo)
    return ratingClass.save();
}


/**
 * 
 * @param {Object} ratingInfo 
 */
export async function save(ratingInfo) {
    return ratingInfo.save()
}

export async function update(id, ratingInfo) {
    return RatingModel.findByIdAndUpdate(id, ratingInfo)
}


export async function find(filter) {
    return RatingModel.find(filter.length > 0 ? { $and: filter } : {})
}


export async function findOne(filter) {
    return RatingModel.findOne(filter.length > 0 ? { $and: filter } : {})
}