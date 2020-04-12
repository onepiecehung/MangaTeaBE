const GenreRepository = require("../repository/genre.repository")
const logger = require("../../util/logger")









export async function insertMultiple(genreInfoArray) {
    try {
        let data = await GenreRepository.createMultiple(genreInfoArray)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}