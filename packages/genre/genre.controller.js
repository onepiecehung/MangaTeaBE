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