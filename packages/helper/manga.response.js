import * as logger from "../../util/logger";

import * as MangaRepository from "../repository/manga.repository";

export async function getMetaDataManga(manga, limit, skip) {
    try {
        let isArray = Array.isArray(manga);
        if (!isArray) {
            manga = [manga];
        }
        let ArrayManga = await MangaRepository.findArrayMangaMinUser(manga, limit, skip > 0 ? (skip - 1) * limit : skip);
        return { manga: ArrayManga, total: manga.length };
    } catch (error) {
        logger.error(error);
        return manga;
    }
}