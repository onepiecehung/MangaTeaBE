const CommentModel = require("../../database/mongo/model/comment.model")


/**
 * 
 * @param {Object} commentInfo 
 */
export async function create(commentInfo) {
    const commentClass = new CommentModel(commentInfo)
    return commentClass.save()
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