const ChapterModel = require("../../database/mongo/model/chapter.model")



/**
 * 
 * @param {Object} mangaInfo 
 */
export async function create(mangaInfo) {
    const chapterClass = new ChapterModel(mangaInfo)
    return chapterClass.save()
}


/**
 * 
 * @param {Number} id 
 */
export async function findById(id) {
    return ChapterModel.findById(id)
}

/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return ChapterModel.find({ name: name })
}

export async function findByIdAndUpdate(id, update) {
    return ChapterModel.findByIdAndUpdate(id, update);
}

export async function findOne(filter) {
    return ChapterModel.findOne(filter);
}