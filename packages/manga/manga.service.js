import { findAndMoveElementToLastArray } from "../../util/help";
import { MANGA } from "../../globalConstant";
import * as logger from "../../util/logger";

import * as ChapterRepository from "../repository/chapter.repository";
import * as CommentRepository from "../repository/comment.repository";
import * as MangaRepository from "../repository/manga.repository";
import * as MemberRepository from "../repository/member.repository";
import * as RatingRepository from "../repository/rating.repository";

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
            name
        } = keyword
        if (id) {
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
                let tempManga = manga;
                let mangaMeta = await getMetaDataManga(tempManga);
                let chapter = await ChapterRepository.findByIdManga(manga._id);
                let rating = await RatingRepository.findRatingByMangaId(manga._id);
                let comment = await CommentRepository.findByMangaId(manga._id);
                return { manga: mangaMeta, chapter, rating, comment };
            }
            return Promise.reject(new Error(MANGA.MANGA_NOT_FOUND))
        }
        const sort = keyword.sort ? { updatedAt: keyword.sort } : { updatedAt: -1 }
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