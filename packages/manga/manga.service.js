import { MANGA } from "../../globalConstant";
import * as logger from "../../util/logger";

import * as MangaRepository from "../repository/manga.repository";

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

export async function createAndUpdate(data) {
    try {
        let mangaInfo = data.body;
        let userInfo = data.user;
        if (mangaInfo.id) {
            let checkManga = await MangaRepository.findById(mangaInfo.id);
            if (!checkManga) {
                return Promise.reject(new Error(MANGA.MANGA_NOT_FOUND));
            }
            if (checkManga.createBy === userInfo._id || userInfo.role === "ROOT" || userInfo.role === "ADMIN" || userInfo.permission.includes(777) === true) {
                mangaInfo.updateBy = userInfo._id;
                await MangaRepository.findByIdAndUpdate(mangaInfo.id, mangaInfo);
                return true;
            }
            return Promise.reject(new Error(MANGA.MANGA_permission_denied))
        }
        let tempBody = mangaInfo;
        delete tempBody.coverImage;
        delete tempBody.bannerImage;
        let checkExist = await MangaRepository.findOne(tempBody);
        if (checkExist) {
            return Promise.reject(new Error(MANGA.MANGA_IS_EXISTS))
        }
        mangaInfo.updateBy = userInfo._id;
        mangaInfo.createBy = userInfo._id;
        let dataManga = await MangaRepository.create(mangaInfo);
        return dataManga;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}