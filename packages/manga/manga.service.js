import * as MangaRepository from "../repository/manga.repository";
import * as logger from "../../util/logger";

export async function find(keyword) {
    try {
        const {
            fromCreatedAt,
            toCreatedAt,
            genre,
            id,
            authorName,
            isAdult,
            country,
            tags,
            format,
            status
        } = keyword
        if (id) {
            let data = await MangaRepository.findById(id);
            return data;
        }
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
        if (genre) {
            if (Array.isArray(genre)) {
                filters.push({ genres: { $all: genre } });
            } else {
                filters.push({ genres: genre });
            }
        }
        if (authorName) {
            filters.push({ "staff.name": authorName });
        }
        if (isAdult) {
            filters.push({ isAdult: isAdult });
        }
        if (country) {
            filters.push({ countryOfOrigin: country });
        }
        if (tags) {
            filters.push({ "tags.name": tags });
        }
        if (format) {
            filters.push({ format: format });
        }
        if (status) {
            filters.push({ status: status });
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