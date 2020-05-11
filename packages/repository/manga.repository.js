const MangaModel = require("../../database/mongo/model/manga.model")



/**
 * 
 * @param {Object} mangaInfo 
 */
export async function create(mangaInfo) {
    const mangaClass = new MangaModel(mangaInfo)
    return mangaClass.save()
}


/**
 * 
 * @param {Number} id 
 */
export async function findById(id) {
    return MangaModel.findById(id)
}

/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return MangaModel.find({ name: name })
}

/**
 * 
 * @param {Array} filters 
 * @param {Number} limit 
 * @param {Number} skip 
 * @param {Json} sort 
 */
export async function find(filters, limit, skip, sort) {
    return MangaModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort)
}

/**
 * 
 * @param {Json} filters 
 */
export async function countDocuments(filters) {
    return MangaModel.countDocuments(filters.length > 0 ? { $and: filters } : {})
}