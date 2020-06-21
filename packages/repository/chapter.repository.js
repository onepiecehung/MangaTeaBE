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

export async function findArrayChapter(idArray) {
    return ChapterModel.find({
        _id: {
            $in: idArray
        }
    },
        {
            name: 1,
            chapterNumber: 1,
            updatedAt: 1
        }
    );
}


export async function findArrayChapterV2(idArray) {
    return ChapterModel.find({
        _id: {
            $in: idArray
        }
    });
}