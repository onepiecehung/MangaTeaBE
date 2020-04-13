const response = require("../../util/response.json")
const { GENRE } = require("../../database/mongo/data/genre.data")
const GenreService = require("./genre.service")



export async function autoCreateAllGenre(req, res) {
    try {
        let data = await GenreService.insertMultiple(GENRE)
        return response.success(res, data, 201)
    } catch (error) {
        return response.error(res, req, error)
    }
}

export async function getAllGenre(req, res) {
    try {
        let data = await GenreService.find()
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}


export async function getGenreById(req, res) {
    try {
        let data = await GenreService.findById(req.params.id)
        return response.success(res, data, 200)
    } catch (error) {
        return response.error(res, req, error)
    }
}


// export async function createNewGenre(req, res) {
//     try {
//         let data = await GenreService.create(req.body)
//         return response.success(res, data, 201)
//     } catch (error) {

//     }
// }