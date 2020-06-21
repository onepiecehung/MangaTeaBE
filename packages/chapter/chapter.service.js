import { CHAPTER } from "../../globalConstant";
import * as logger from "../../util/logger";

import * as ChapterRepository from "../repository/chapter.repository";
import * as GroupTranslationRepository from "../repository/groupTranslation.repository";
import * as MangaRepository from "../repository/manga.repository";
import * as MemberRepository from "../repository/member.repository";

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