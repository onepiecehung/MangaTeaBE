const MangaModel = require("../../database/mongo/model/manga.model")



/**
 * 
 * @param {Object} mangaInfo 
 */
export async function create(mangaInfo) {
    const mangaClass = new MangaModel(mangaInfo)
    return mangaClass.save()
}

export async function save(mangaInfo) {
    return mangaInfo.save();
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
    return MangaModel.find(filters.length > 0 ? { $and: filters } : {}).limit(limit).skip(skip).sort(sort);
}

/**
 * 
 * @param {Json} filters 
 */
export async function countDocuments(filters) {
    return MangaModel.countDocuments(filters.length ? { $and: filters } : {})
}


export async function findByIdAndUpdate(id, update) {
    return MangaModel.findByIdAndUpdate(id, update);
}

export async function findOne(filter) {
    return MangaModel.findOne(filter);
}


export async function addChapter(idManga, idChapter) {
    return MangaModel.updateOne({ _id: idManga }, {
        $push: { chapter: idChapter },
        lastUpdatedChapter: Date.now()
    });
}

export async function findArrayMangaMin(ArrayId, limit, skip, sort) {
    return MangaModel.find({
        _id: { $in: ArrayId }
    }, {
        name: 1,
        genres: 1,
        coverImage: 1,
        bannerImage: 1,
        chapter: 1
    }).limit(limit).skip(skip).sort(sort)
}


export async function findAtHome(filters, limit, skip, sort) {
    return MangaModel.find(filters.length > 0 ? { $and: filters } : {}, {
        name: 1,
        genres: 1,
        coverImage: 1,
        bannerImage: 1,
        chapter: 1
    }).limit(limit).skip(skip).sort(sort)
}

export async function findArrayMangaMinUser(ArrayId, limit, skip) {
    return MangaModel.find({
        _id: { $in: ArrayId }
    }, {
        name: 1,
        coverImage: 1,
        bannerImage: 1
    }).limit(limit).skip(skip)
}

export async function deleteManga(id) {
    return MangaModel.deleteOne({ _id: id })
}