const MangaRepository = require("../repository/manga.repository")
const logger = require("../../util/logger")

export async function find(keyword) {
    try {
        const {
            fromCreatedAt,
            toCreatedAt
        } = keyword
        const sort = keyword.sort || { createdAt: -1 }
        const limit = parseInt(keyword.limit) || 20
        const skip = parseInt(keyword.skip) || 0
        let filters = [];
        if (fromCreatedAt) {
            filters.push({ createdAt: { $gte: new Date(fromCreatedAt) } });
        }
        if (toCreatedAt) {
            filters.push({ createdAt: { $lte: new Date(toCreatedAt) } });
        }
        let [manga, total] = await Promise.all([
            MangaRepository.find(filters, limit, skip, sort),
            MangaRepository.countDocuments(filters)
        ])
        return { manga, total }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}