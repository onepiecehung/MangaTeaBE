const CommentModel = require("../../database/mongo/model/comment.model")


/**
 * 
 * @param {Object} commentInfo 
 */
export async function create(commentInfo) {
    const commentClass = new CommentModel(commentInfo)
    return commentClass.save()
}

export async function save(commentInfo) {
    return commentInfo.save()
}

export async function findByIdAndUpdate(id, update) {
    return CommentModel.findByIdAndUpdate(id, update)
}

/**
 * 
 * @param {Number} id 
 */
export async function findById(id) {
    return CommentModel.findById(id)
}



/**
 * 
 * @param {Number} id 
 */
export async function findByChapterId(id) {
    return CommentModel.find({ chapterID: id })
}


/**
 * 
 * @param {Number} id 
 */
export async function findByMangaId(id) {
    return CommentModel.find({ mangaID: id })
}


/**
 * 
 * @param {Number} id 
 */
export async function findByGroupTranslationId(id) {
    return CommentModel.find({ groupTranslationID: id })
}

/**
 * 
 * @param {Number} id 
 */
export async function findByUserId(id) {
    return CommentModel.find({ userID: id })
}

/**
 * 
 * @param {String} status 
 */
export async function findByStatus(status) {
    return CommentModel.find({ status: status })
}


export async function find(filters, skip, limit, sort, populate) {
    return (populate === true ? CommentModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort).populate("reply userID") : CommentModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort))
}

export async function countDocuments(filters) {
    return CommentModel.countDocuments(filters.length ? { $and: filters } : {})
}