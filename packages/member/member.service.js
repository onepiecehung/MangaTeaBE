const MemberRepository = require("../repository/member.repository")
const MangaRepository = require("../repository/manga.repository")
const logger = require("../../util/logger")
const { USER_ERROR, MANGA } = require("../../globalConstant/index")

export async function findByIdAndPopulate(id) {
    try {
        let data = await MemberRepository.findByIdAndPopulate(id)
        return data
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function saveManga(idManga, userAuth) {
    try {
        let mangaInfo = await MangaRepository.findById(idManga)
        if (!mangaInfo) {
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        if (memberInfo.mangaSaved && memberInfo.mangaSaved.includes(idManga) === true) {
            return Promise.reject(MANGA.MANGA_SAVED_EXIST);
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
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
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
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        if (memberInfo.mangaFavorite && memberInfo.mangaFavorite.includes(idManga) === true) {
            return Promise.reject(MANGA.MANGA_SAVED_EXIST);
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
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
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
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        if (memberInfo.historyReading && memberInfo.historyReading.includes(idManga) === true) {
            return Promise.reject(MANGA.MANGA_SAVED_EXIST);
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
            return Promise.reject(MANGA.MANGA_NOT_EXISTS)
        }
        let memberInfo = await MemberRepository.findByUserID(userAuth._id);
        if (!memberInfo) {
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
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
            return Promise.reject(USER_ERROR.USER_NOT_FOUND);
        }
        memberInfo.set("historyReading", [])
        let member = await MemberRepository.save(memberInfo)
        return member
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}