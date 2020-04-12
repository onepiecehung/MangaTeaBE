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