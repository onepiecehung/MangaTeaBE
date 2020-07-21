import { USER_ERROR, MANGA } from "../../globalConstant/index";
import * as logger from "../../util/logger";

import { getMetaDataManga } from "../helper/manga.response";
import * as MangaRepository from "../repository/manga.repository";
import * as MemberRepository from "../repository/member.repository";

export async function findByIdAndPopulate(id) {
    try {
        let data = await MemberRepository.findByIdAndPopulate(id)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function findByIdUserAndPopulate(id, query) {
    try {
        const {
            mangaFavorite,
            mangaSaved,
            mangaUpload,
            chapterUpload,
            historyReading,
            historyReadingChapter,
            mangaSuggested,
        } = query;
        const limit = parseInt(query.limit) || 20
        const skip = parseInt(query.skip) || 0
        let data = await MemberRepository.findByUserID(id);
        if (mangaFavorite == 1 && data.mangaFavorite.length > 0) {
            let result = await getMetaDataManga(data.mangaFavorite, limit, skip);
            return result;
        }
        if (mangaSaved == 1 && data.mangaSaved.length > 0) {
            let result = await getMetaDataManga(data.mangaSaved, limit, skip);
            return result;
        }
        if (chapterUpload == 1 && data.chapterUpload.length > 0) {
            let result = await getMetaDataManga(data.chapterUpload, limit, skip);
            return result;
        }
        if (historyReading == 1 && data.historyReading.length > 0) {
            let result = await getMetaDataManga(data.historyReading, limit, skip);
            return result;
        }
        if (mangaUpload == 1 && data.mangaUpload.length > 0) {
            let result = await getMetaDataManga(data.mangaUpload, limit, skip);
            return result;
        }
        if (historyReadingChapter == 1 && data.historyReadingChapter.length > 0) {
            // let result = await getMetaDataManga(data.historyReadingChapter, limit, skip);
            return null;
        }
        if (mangaSuggested == 1 && data.mangaSuggested.length > 0) {
            let result = await getMetaDataManga(data.mangaSuggested, limit, skip);
            return result;
        }
        return { manga: [], total: 0 };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function saveManga(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.mangaSaved && memberInfo.mangaSaved.includes(idManga) === true) {
            return MANGA.MANGA_SAVED_EXIST;
        }
        if (!memberInfo.mangaSaved || memberInfo.mangaSaved.length == 0) {
            var arrayManga = []
            arrayManga.push(idManga)
        } else {
            var arrayManga = [...memberInfo.mangaSaved]
            arrayManga.push(idManga)
        }
        memberInfo.set("mangaSaved", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function unsavedManga(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.mangaSaved && memberInfo.mangaSaved.includes(idManga) === true) {
            var arrayManga = [...memberInfo.mangaSaved]
            let index = arrayManga.indexOf(parseInt(idManga));
            if (index > -1) {
                arrayManga.splice(index, 1);
            }
        } else {
            if (!memberInfo.mangaSaved || memberInfo.mangaSaved.length == 0) {
                var arrayManga = []
                arrayManga.push(idManga)
            } else {
                var arrayManga = [...memberInfo.mangaSaved]
                arrayManga.push(idManga)
            }
        }
        memberInfo.set("mangaSaved", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function addMangaFavorite(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.mangaFavorite && memberInfo.mangaFavorite.includes(idManga) === true) {
            return MANGA.MANGA_SAVED_EXIST;
        }
        if (!memberInfo.mangaFavorite || memberInfo.mangaFavorite.length == 0) {
            var arrayManga = []
            arrayManga.push(idManga)
        } else {
            var arrayManga = [...memberInfo.mangaFavorite]
            arrayManga.push(idManga)
        }
        memberInfo.set("mangaFavorite", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function removeMangaFavorite(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.mangaFavorite && memberInfo.mangaFavorite.includes(idManga) === true) {
            var arrayManga = [...memberInfo.mangaFavorite]
            let index = arrayManga.indexOf(parseInt(idManga));
            if (index > -1) {
                arrayManga.splice(index, 1);
            }
        } else {
            if (!memberInfo.mangaFavorite || memberInfo.mangaFavorite.length == 0) {
                var arrayManga = []
                arrayManga.push(idManga)
            } else {
                var arrayManga = [...memberInfo.mangaFavorite]
                arrayManga.push(idManga)
            }
        }
        memberInfo.set("mangaFavorite", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function addMangaHistory(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.historyReading && memberInfo.historyReading.includes(idManga) === true) {
            return MANGA.MANGA_SAVED_EXIST;
        }
        if (!memberInfo.historyReading || memberInfo.historyReading.length == 0) {
            var arrayManga = []
            arrayManga.push(idManga)
        } else {
            var arrayManga = [...memberInfo.historyReading]
            arrayManga.push(idManga)
        }
        memberInfo.set("historyReading", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function removeMangaHistory(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return MANGA.MANGA_NOT_EXISTS;
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        if (memberInfo.historyReading && memberInfo.historyReading.includes(idManga) === true) {
            var arrayManga = [...memberInfo.historyReading]
            let index = arrayManga.indexOf(parseInt(idManga));
            if (index > -1) {
                arrayManga.splice(index, 1);
            }
        } else {
            if (!memberInfo.historyReading || memberInfo.historyReading.length == 0) {
                var arrayManga = []
                arrayManga.push(idManga)
            } else {
                var arrayManga = [...memberInfo.historyReading]
                arrayManga.push(idManga)
            }
        }
        memberInfo.set("historyReading", arrayManga)
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function removeAllMangaHistory(userAuth) {
    try {
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return USER_ERROR.USER_NOT_FOUND;
        }
        memberInfo.set("historyReading", [])
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}