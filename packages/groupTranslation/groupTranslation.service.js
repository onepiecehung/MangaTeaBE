import { GROUP_TRANSLATION } from "../../globalConstant/index";
import * as logger from "../../util/logger";

import * as GroupTranslationRepository from "../repository/groupTranslation.repository";

export async function createAndUpdate(data) {
    try {
        let groupTranslationInfo = data.body;
        let userInfo = data.user;
        if (groupTranslationInfo.id) {
            let checkGroup = await GroupTranslationRepository.findById(groupTranslationInfo.id);
            if (!checkGroup) {
                return Promise.reject(new Error(GROUP_TRANSLATION.GROUP_TRANSLATION_IS_NOT_FOUND));
            }
            if (checkGroup.createBy === userInfo._id || userInfo.role === "ROOT" || userInfo.role === "ADMIN" || userInfo.permission.includes(777) === true) {
                groupTranslationInfo.updateBy = userInfo._id;
                await GroupTranslationRepository.findByIdAndUpdate(groupTranslationInfo.id, groupTranslationInfo);
                return true;
            }
            return Promise.reject(new Error(GROUP_TRANSLATION.GROUP_TRANSLATION_permission_denied));
        }
        let checkExist = await GroupTranslationRepository.findOne(groupTranslationInfo);
        if (checkExist) {
            return Promise.reject(new Error(GROUP_TRANSLATION.GROUP_TRANSLATION_IS_EXIST));
        }
        groupTranslationInfo.updateBy = userInfo._id;
        groupTranslationInfo.createBy = userInfo._id;
        groupTranslationInfo.userOwnerID = userInfo._id;
        let dataGroupTranslation = await GroupTranslationRepository.create(groupTranslationInfo);
        return dataGroupTranslation;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function find(query) {
    try {
        if (query.id) {
            if (query.populate) {
                let data = await GroupTranslationRepository.findByIdAndPopulate(parseInt(query.id), true);
                data.chapterID = data.chapterID.length || 0
                return data;
            }
            let data = await GroupTranslationRepository.findByIdAndPopulate(parseInt(query.id), false);
            data.chapterID = data.chapterID.length || 0
            return data;
        }
        let filters = [];
        if (query.name) {
            filters.push({ name: new RegExp(query.name, "i") });
        }
        if (query.userOwnerID) {
            filters.push({ userOwnerID: parseInt(query.userOwnerID) });
        }
        if (query.web) {
            filters.push({ web: new RegExp(query.web, "i") });
        }
        if (query.discord) {
            filters.push({ discord: new RegExp(query.discord, "i") });
        }
        if (query.email) {
            filters.push({ email: new RegExp(query.email, "i") });
        }
        if (query.about) {
            filters.push({ about: new RegExp(query.about, "i") });
        }
        if (query.isUploadMember) {
            filters.push({ isUploadMember: isUploadMember });
        }
        if (query.updateBy) {
            filters.push({ updateBy: parseInt(query.updateBy) });
        }
        if (query.createBy) {
            filters.push({ createBy: parseInt(query.createBy) });
        }
        const sort = { createAt: -1 };
        const skip = parseInt(query.skip) || 0;
        const limit = parseInt(query.limit) || 20;
        const populate = query.populate || false;
        let [groupTranslation, totals] = await Promise.all([
            GroupTranslationRepository.find(filters, skip, limit, sort, populate),
            GroupTranslationRepository.countDocuments(filters)
        ])
        for (let i = 0; i < groupTranslation.length; i++) {
            groupTranslation[i].chapterID = groupTranslation[i].chapterID.length || 0
        }
        return { groupTranslation, totals };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function upload(idGroup, user, dataUpdate) {
    try {
        let checkExist = await GroupTranslationRepository.findById(idGroup);
        if (!checkExist) {
            return Promise.reject(new Error(GROUP_TRANSLATION.GROUP_TRANSLATION_IS_NOT_EXIST));
        }
        if (checkExist.userOwnerID === user._id || user.role === "ADMIN" || user.role === "ROOT" || user.permission.includes(777) === true) {
            dataUpdate.updateBy = user._id;
            await GroupTranslationRepository.findByIdAndUpdate(idGroup, dataUpdate);
            return true;
        } else {
            return Promise.reject(new Error(GROUP_TRANSLATION.GROUP_TRANSLATION_permission_denied))
        }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}