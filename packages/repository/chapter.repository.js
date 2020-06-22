const ChapterModel = require("../../database/mongo/model/chapter.model")



/**
 * 
 * @param {Object} mangaInfo 
 */
export async function create(chapterInfo) {
    const chapterClass = new ChapterModel(chapterInfo)
    return chapterClass.save()
}

export async function save(chapterInfo) {
    return chapterInfo.save();
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

export async function find(filters, limit, skip, sort) {
    return ChapterModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort)
}

/**
 * 
 * @param {Json} filters 
 */
export async function countDocuments(filters) {
    return ChapterModel.countDocuments(filters.length ? { $and: filters } : {})
}


export async function findByIdManga(idManga) {
    return ChapterModel.find({ mangaID: idManga });
}

export async function findByIdMangaPopulate(idManga) {
    return ChapterModel.find({ mangaID: idManga }).populate("groupTranslation language");
}