const raccoon = require('raccoon');

import { findAndMoveElementToLastArray } from "../../util/help";
import { MANGA, USER_ERROR } from "../../globalConstant";
import * as logger from "../../util/logger";
import * as Redis from "../../database/redis/client";

import * as ChapterRepository from "../repository/chapter.repository";
import * as CommentRepository from "../repository/comment.repository";
import * as CountryRepository from "../repository/country.repository";
import * as GroupTranslationRepository from "../repository/groupTranslation.repository";
import * as MangaRepository from "../repository/manga.repository";
import * as MemberRepository from "../repository/member.repository";
import * as RatingRepository from "../repository/rating.repository";
import * as UserRepository from "../repository/user.repository";

export async function find(keyword, user) {
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
            status,
            name,
            year,
            yearEnd,
            fromYear,
            toYear,
            fromYearEnd,
            toYearEnd
        } = keyword
        if (id) {
            let myKey = `MangaInfo:${id}`;
            let value = await Redis.getJson(myKey);
            if (value) {
                return value;
            }
            let manga = await MangaRepository.findById(id);
            if (manga) {
                manga.set("view", manga.view ? manga.view + 1 : 1);
                await MangaRepository.save(manga);
                if (user !== false && user._id) {
                    let memberInfo = await MemberRepository.findByUserID(user._id);
                    if (memberInfo && memberInfo.historyReading) {
                        if (memberInfo.historyReading.includes(manga._id) === true) {
                            let tempArray = await findAndMoveElementToLastArray(manga._id, memberInfo.historyReading)
                            memberInfo.set("historyReading", tempArray);
                            await MemberRepository.save(memberInfo);
                        } else {
                            await MemberRepository.addMangaHistory(user._id, manga._id);
                        }
                    }
                }
                // let tempManga = manga;
                // let mangaMeta = await getMetaDataManga(tempManga);
                let chapter = await ChapterRepository.findByIdMangaSelect(manga._id);
                let tempChapter = chapter;
                let chapterMeta = await getMetaDataChapter(tempChapter);
                // let rating = await RatingRepository.findRatingByMangaId(manga._id);
                let comment = await CommentRepository.findByMangaId(manga._id);
                let data = { manga, chapter: chapterMeta, comment };
                await Redis.setJson(myKey, data, 300)
                return data;
            }
            return Promise.reject(new Error(MANGA.MANGA_NOT_FOUND))
        }
        const sort = keyword.sort ? { lastUpdatedChapter: keyword.sort } : { lastUpdatedChapter: -1 }
        const limit = parseInt(keyword.limit) || 20
        const skip = parseInt(keyword.skip) || 0
        let filters = [];
        if (name) {
            filters.push({ name: new RegExp(name, "i") });
        }
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
                filters.push({ genres: new RegExp(genre, "i") });
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
        if (year) {
            filters.push({ "startDate.year": parseInt(year) })
        }
        if (yearEnd) {
            filters.push({ "endDate.year": parseInt(yearEnd) })
        }
        if (fromYear) {
            filters.push({ "startDate.year": { $gte: parseInt(fromYear) } });
        }
        if (toYear) {
            filters.push({ "startDate.year": { $lte: parseInt(toYear) } });
        }
        if (fromYearEnd) {
            filters.push({ "endDate.year": { $gte: parseInt(fromYearEnd) } });
        }
        if (toYearEnd) {
            filters.push({ "endDate.year": { $lte: parseInt(toYearEnd) } });
        }
        let [mangaMeta, total] = await Promise.all([
            MangaRepository.find(filters, limit, skip > 0 ? (skip - 1) * limit : skip, sort),
            MangaRepository.countDocuments(filters)
        ])
        let tempManga = mangaMeta;
        let manga = await getMetaDataManga(tempManga);
        return { manga, total }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

async function getMetaDataManga(manga) {
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

async function getMetaDataChapter(chapter) {
    try {
        let isArray = Array.isArray(chapter);
        if (!isArray) {
            chapter = [chapter];
        }
        let promise = chapter.map(async e => {
            if (e.groupTranslation) {
                e.groupTranslation = await GroupTranslationRepository.getNameAndId(e.groupTranslation);
            }
            if (e.language) {
                e.language = await CountryRepository.findForChapter(e.language);
            }
            if (e.createBy) {
                e.createBy = await UserRepository.getUsernameAndId(e.createBy);
            }
            return e;
        })
        let data = await Promise.all(promise);
        return isArray ? data : data[0];
    } catch (error) {
        logger.error(error);
    }
}


export async function createAndUpdate(data) {
    try {
        let mangaInfo = data.body;
        let userInfo = data.user;
        if (mangaInfo.id) {
            let myKey = `MangaInfo:${mangaInfo.id}`;
            let value = await Redis.getJson(myKey);
            if (value) {
                await Redis.deleteKey(myKey);
            }
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


export async function findAtHome(keyword, user) {
    try {
        const {
            historyReading,
            trending,
            popularity,
            slide
        } = keyword;
        // const sort = keyword.sort ? { updatedAt: keyword.sort } : { updatedAt: -1 }
        const limit = parseInt(keyword.limit) || 20
        const skip = parseInt(keyword.skip) || 0
        let filters = [];
        if (historyReading == 1) {
            if (user !== false) {
                let member = await MemberRepository.findByUserID(user._id);
                if (!member) {
                    return Promise.reject(new Error(USER_ERROR.USER_NOT_FOUND))
                }
                if (member.historyReading.length === 0) {
                    return { message: `You are not logged in or you have no reading history.` };
                }
                let manga = await MangaRepository.findArrayMangaMin(member.historyReading, limit, skip > 0 ? (skip - 1) * limit : skip, {});
                let data = { manga: manga, total: member.historyReading.length }
                return data;
            }
            return { message: `You are not logged in or you have no reading history.` };
        }
        if (slide) {
            if (user !== false) {
                let arraySlide = await raccoon.recommendFor(user._id, limit);
                console.log(arraySlide);
                if (arraySlide.length != 0) {
                    let manga = await MangaRepository.findArrayMangaMin(arraySlide, limit, skip > 0 ? (skip - 1) * limit : skip, {});
                    let temp = await getMetaDataManga(manga);
                    let data = { manga: temp, total: arraySlide.length }
                    return data;
                }
                let member = await MemberRepository.findByUserID(user._id);
                if (!member) {
                    return Promise.reject(new Error(USER_ERROR.USER_NOT_FOUND))
                }
                if (member.mangaSuggested.length !== 0) {
                    let manga = await MangaRepository.findArrayMangaMin(member.mangaSuggested, limit, skip > 0 ? (skip - 1) * limit : skip, {});
                    let temp = await getMetaDataManga(manga);
                    let data = { manga: temp, total: member.mangaSuggested.length }
                    return data;
                }
                let [mangaMeta, total] = await Promise.all([
                    MangaRepository.findAtHome(filters, limit, skip > 0 ? (skip - 1) * limit : skip, { popularity: -1 }),
                    MangaRepository.countDocuments(filters)
                ])
                let tempManga = mangaMeta;
                let manga = await getMetaDataManga(tempManga);
                return { manga, total }
            }
            let [mangaMeta, total] = await Promise.all([
                MangaRepository.findAtHome(filters, limit, skip > 0 ? (skip - 1) * limit : skip, { popularity: -1 }),
                MangaRepository.countDocuments(filters)
            ])
            let tempManga = mangaMeta;
            let manga = await getMetaDataManga(tempManga);
            return { manga, total }
        }
        if (trending) {
            let [mangaMeta, total] = await Promise.all([
                MangaRepository.findAtHome(filters, limit, skip > 0 ? (skip - 1) * limit : skip, { trending: trending }),
                MangaRepository.countDocuments(filters)
            ])
            let tempManga = mangaMeta;
            let manga = await getMetaDataManga(tempManga);
            return { manga, total }
        }
        if (popularity) {
            let [mangaMeta, total] = await Promise.all([
                MangaRepository.findAtHome(filters, limit, skip > 0 ? (skip - 1) * limit : skip, { popularity: popularity }),
                MangaRepository.countDocuments(filters)
            ])
            let tempManga = mangaMeta;
            let manga = await getMetaDataManga(tempManga);
            return { manga, total }
        }
        return Promise.reject(new Error("Params is incorrect!"))
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function findSuggestion(keyword) {
    try {
        const {
            genre,
            tag,
            description,
            id,
            all
        } = keyword;
        const limit = parseInt(keyword.limit) || 20
        const skip = parseInt(keyword.skip) || 0
        if (all) {
            let data = await MangaRepository.findById(id);
            let [suggestionDescription, suggestionGenres, suggestionTags] = await Promise.all([
                MangaRepository.findArrayMangaMinUser(data.suggestionDescription, limit, skip),
                MangaRepository.findArrayMangaMinUser(data.suggestionGenres, limit, skip),
                MangaRepository.findArrayMangaMinUser(data.suggestionTags, limit, skip)
            ])
            return { suggestionDescription, suggestionGenres, suggestionTags }
        }
        if (description) {
            let data = await MangaRepository.findById(id);
            let result = await MangaRepository.findArrayMangaMinUser(data.suggestionDescription, limit, skip);
            return result;
        }
        if (genre) {
            let data = await MangaRepository.findById(id);
            let result = await MangaRepository.findArrayMangaMinUser(data.suggestionGenres, limit, skip);
            return result;
        }
        if (tag) {
            let data = await MangaRepository.findById(id);
            let result = await MangaRepository.findArrayMangaMinUser(data.suggestionTags, limit, skip);
            return result;
        }
        return Promise.reject("Query is required!");
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}