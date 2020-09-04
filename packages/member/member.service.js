import { USER_ERROR, MANGA } from "../../globalConstant/index";
import * as logger from "../../util/logger";

import { getMetaDataManga } from "../helper/manga.response";
import * as ChapterRepository from "../repository/chapter.repository";
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
            let result = await MangaRepository.findArrayMangaMin(data.mangaFavorite, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.mangaFavorite.length }
        }
        if (mangaSaved == 1 && data.mangaSaved.length > 0) {
            let result = await MangaRepository.findArrayMangaMin(data.mangaSaved, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.mangaSaved.length }
        }
        if (chapterUpload == 1 && data.chapterUpload.length > 0) {
            let result = await MangaRepository.findArrayMangaMin(data.chapterUpload, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.chapterUpload.length }
        }
        if (historyReading == 1 && data.historyReading.length > 0) {
            let result = await MangaRepository.findArrayMangaMin(data.historyReading, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.historyReading.length }
        }
        if (mangaUpload == 1 && data.mangaUpload.length > 0) {
            let result = await MangaRepository.findArrayMangaMin(data.mangaUpload, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.mangaUpload.length }
        }
        if (historyReadingChapter == 1 && data.historyReadingChapter.length > 0) {
            // let result = await getMetaDataManga(data.historyReadingChapter, limit, skip);
            return null;
        }
        if (mangaSuggested == 1 && data.mangaSuggested.length > 0) {
            let result = await MangaRepository.findArrayMangaMin(data.mangaSuggested, limit, skip > 0 ? (skip - 1) * limit : skip, { _id: -1 });
            let tempManga = result;
            let manga = await getMetaDataManga2(tempManga);
            return { manga, total: data.mangaSuggested.length }
        }
        return { manga: [], total: 0 };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


async function getMetaDataManga2(manga) {
    try {
        let isArray = Array.isArray(manga);
        if (!isArray) {
            manga = [manga];
        }
        let promise = manga.map(async e => {
            if (e.chapter) {
                if (e.chapter.length > 4) {
                    let lengthChapter = e.chapter.length;
                    let ArrayChapterId = [];
                    ArrayChapterId.push(e.chapter[0]);
                    ArrayChapterId.push(e.chapter[lengthChapter - 3]);
                    ArrayChapterId.push(e.chapter[lengthChapter - 2]);
                    ArrayChapterId.push(e.chapter[lengthChapter - 1]);
                    e.chapter = await ChapterRepository.findArrayChapter(ArrayChapterId);
                } else {
                    e.chapter = await ChapterRepository.findArrayChapter(e.chapter);
                }
            }
            return e;
        })
        let data = await Promise.all(promise);
        return isArray ? data : data[0];
    } catch (error) {
        logger.error(error);
        return manga;
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