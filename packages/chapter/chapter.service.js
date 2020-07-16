import { CHAPTER } from "../../globalConstant";
import { findAndMoveElementToLastArray } from "../../util/help";
import * as logger from "../../util/logger";

import * as ChapterRepository from "../repository/chapter.repository";
import * as CommentRepository from "../repository/comment.repository";
import * as GroupTranslationRepository from "../repository/groupTranslation.repository";
import * as MangaRepository from "../repository/manga.repository";
import * as MemberRepository from "../repository/member.repository";

export async function find(keyword, user) {
    try {
        const {
            fromCreatedAt,
            toCreatedAt,
            id,
            chapterNumber,
            groupTranslation,
            language,
            mangaID,
            status,
            name
        } = keyword
        if (id) {
            let chapter = await ChapterRepository.findById(id);
            if (chapter) {
                chapter.set("view", chapter.view ? chapter.view + 1 : 1);
                await ChapterRepository.save(chapter);
                if (user !== false && user._id) {
                    let memberInfo = await MemberRepository.findByUserID(user._id);
                    if (memberInfo && memberInfo.historyReadingChapter) {
                        if (memberInfo.historyReadingChapter.includes(id) === true) {
                            let tempArray = await findAndMoveElementToLastArray(id, memberInfo.historyReadingChapter)
                            memberInfo.set("historyReadingChapter", tempArray);
                            await MemberRepository.save(memberInfo);
                        } else {
                            await MemberRepository.addMangaHistory(user._id, chapter._id);
                        }
                    }
                }
                let comment = await CommentRepository.findByChapterId(id)
                return { chapter, comment };
            }
            return Promise.reject(new Error(CHAPTER.CHAPTER_IS_NOT_FOUND));
        }
        const sort = keyword.sort ? { createdAt: keyword.sort } : { createdAt: -1 }
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
        if (chapterNumber) {
            filters.push({ chapterNumber });
        }
        if (groupTranslation) {
            filters.push({ groupTranslation });
        }
        if (language) {
            filters.push({ language });
        }
        if (mangaID) {
            filters.push({ mangaID });
        }
        if (status) {
            filters.push({ status });
        }

        let [chapter, total] = await Promise.all([
            ChapterRepository.find(filters, limit, skip > 0 ? (skip - 1) * limit : skip, sort),
            ChapterRepository.countDocuments(filters)
        ])
        return { chapter, total };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}




export async function createAndUpdate(data) {
    try {
        let chapterInfo = data.body;
        let userInfo = data.user;
        if (chapterInfo.id) {
            let checkChapter = await ChapterRepository.findById(chapterInfo.id);
            if (!checkChapter) {
                return Promise.reject(new Error(CHAPTER.CHAPTER_IS_NOT_FOUND));
            }
            if (checkChapter.createBy === userInfo._id || userInfo.role === "ROOT" || userInfo.role === "ADMIN" || userInfo.permission.includes(777) === true) {
                chapterInfo.updateBy = userInfo._id;
                await ChapterRepository.findByIdAndUpdate(chapterInfo.id, chapterInfo);
                return true;
            }
            if (checkChapter.groupTranslation && checkChapter.groupTranslation !== 0) {
                let dataGroup = await GroupTranslationRepository.findById(checkChapter.groupTranslation);
                if (dataGroup && dataGroup.userOwnerID === userInfo._id) {
                    chapterInfo.updateBy = userInfo._id;
                    await ChapterRepository.findByIdAndUpdate(chapterInfo.id, chapterInfo);
                    return true;
                }
            }
            return Promise.reject(new Error(CHAPTER.CHAPTER_permission_denied));
        }
        chapterInfo.updateBy = userInfo._id;
        chapterInfo.createBy = userInfo._id;
        let dataChapter = await ChapterRepository.create(chapterInfo);
        await MangaRepository.addChapter(chapterInfo.mangaID, dataChapter._id);
        await MemberRepository.addChapterUpload(userInfo._id, dataChapter._id);
        if (chapterInfo.groupTranslation) {
            let dataGroup = await GroupTranslationRepository.findById(chapterInfo.groupTranslation);
            if (dataGroup && (dataGroup.isUploadMember === false || dataGroup.userOwnerID === userInfo._id || dataGroup.userMemberID.includes(userInfo._id) === true)) {
                if (dataGroup.chapterID.includes(dataChapter._id) === false) {
                    await GroupTranslationRepository.addChapter(chapterInfo.groupTranslation, dataChapter._id);
                }
            }
        }
        return dataChapter;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}



