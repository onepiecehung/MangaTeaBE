const GenreModel = require("../../database/mongo/model/genre.model")


/**
 * 
 * @param {Object} genreInfo 
 */
export async function create(genreInfo) {
    const genreClass = new GenreModel(genreInfo)
    return genreClass.save()
}


/**
 * 
 * @param {Number} id 
 */
export async function findById(id) {
    return GenreModel.findById(id)
}


/**
 * 
 * @param {String} name 
 */
export async function findByName(name) {
    return GenreModel.find({ name: name })
}

/**
 * 
 * @param {Number} id 
 */
export async function findByUserIdCreate(id) {
    return GenreModel.find({ createBy: id })
}


export async function findAll(){
    return GenreModel.find();
}
/**
 * 
 * @param {ArrayObject} genreInfoArray 
 */
export async function createMultiple(genreInfoArray) {
    return await GenreModel.insertMany(genreInfoArray)
}