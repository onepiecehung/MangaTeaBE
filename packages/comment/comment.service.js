import * as logger from "../../util/logger";

import * as CommentRepository from "../repository/comment.repository";
import { COMMENT } from "../../globalConstant/index"


export async function createAndUpdate(body, query) {
    try {
        if (query.idu && query.idr) {
            return Promise.reject(new Error('Only update or reply, do not sent two the same time'));
        }
        if (!query.idu && !query.idr && body.commentContent) {
            let dataInfo;
            if (body.type === "CHAPTER" && body.chapterID && body.mangaID) {
                dataInfo = {
                    type: body.type,
                    chapterID: body.chapterID,
                    mangaID: body.mangaID,
                    commentContent: body.commentContent,
                    userID: body.userID
                }
            }
            if (body.type === "MANGA" && body.mangaID) {
                dataInfo = {
                    type: body.type,
                    // chapterID: body.chapterID,
                    mangaID: body.mangaID,
                    commentContent: body.commentContent,
                    userID: body.userID
                }
            }
            if (body.type === "GROUPTRANSLATION") {
                dataInfo = {
                    type: body.type,
                    commentContent: body.commentContent,
                    userID: body.userID,
                    groupTranslationID: body.groupTranslationID
                }
            }
            if (!dataInfo) {
                return Promise.reject(new Error('Missing some type of comment (ID: manga, chapter, group)'));
            }
            let data = await CommentRepository.create(dataInfo);
            return data;
        }
        if (query.idu && !query.idr && body.commentContent) {
            let checkComment = await CommentRepository.findById(query.idu)
            if (!checkComment) {
                return Promise.reject(new Error(COMMENT.COMMENT_NOT_FOUND));
            }
            let dataInfo = {
                commentContent: body.commentContent,
                isEdit: true
            }
            if (!dataInfo) {
                return Promise.reject(new Error('Missing some type of comment (ID: manga, chapter, group)'));
            }
            await CommentRepository.findByIdAndUpdate(query.idu, dataInfo);
            return true;
        }
        if (!query.idu && query.idr && body.commentContent) {
            let dataInfo;
            if (body.type === "CHAPTER" && body.chapterID && body.mangaID) {
                dataInfo = {
                    type: body.type,
                    chapterID: body.chapterID,
                    mangaID: body.mangaID,
                    commentContent: body.commentContent,
                    userID: body.userID
                }
            }
            if (body.type === "MANGA" && body.mangaID) {
                dataInfo = {
                    type: body.type,
                    // chapterID: body.chapterID,
                    mangaID: body.mangaID,
                    commentContent: body.commentContent,
                    userID: body.userID
                }
            }
            if (body.type === "GROUPTRANSLATION") {
                dataInfo = {
                    type: body.type,
                    commentContent: body.commentContent,
                    userID: body.userID,
                    groupTranslationID: body.groupTranslationID
                }
            }
            if (!dataInfo) {
                return Promise.reject(new Error('Missing some type of comment (ID: manga, chapter, group)'));
            }
            let data = await CommentRepository.create(dataInfo);
            let dataReply = await CommentRepository.findById(query.idr);
            let arrayReply = [...dataReply.reply];
            arrayReply.push(data._id);
            dataReply.set("reply", arrayReply);
            await CommentRepository.save(dataReply);
            return data;
        }
        return Promise.reject(new Error('Missing some type of comment'));
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function find(query) {
    try {
        let data = await CommentRepository.find();
        return data;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}