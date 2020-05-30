import { APPELLATION } from "../../globalConstant/index";
import * as logger from "../../util/logger";

import * as AppellationRepository from "../repository/appellation.repository";

export async function createAndUpdate(data) {
    try {
        let appellationInfo = data.body;
        let userInfo = data.user;
        if (appellationInfo.id) {
            let checkAppellation = await AppellationRepository.findById(appellationInfo.id)
            if (!checkAppellation) {
                return Promise.reject(new Error(APPELLATION.APPELLATION_ID_NOT_FOUND));
            }
            appellationInfo.updateBy = userInfo._id;
            await AppellationRepository.findByIdAndUpdate(appellationInfo.id, appellationInfo);
            return true;
        }
        let checkExist = await AppellationRepository.findOne(appellationInfo);
        if (checkExist) {
            return Promise.reject(new Error(APPELLATION.APPELLATION_IS_EXIST));
        }
        appellationInfo.createBy = userInfo._id;
        appellationInfo.updateBy = userInfo._id;
        let dataAppellation = await AppellationRepository.create(appellationInfo);
        return dataAppellation;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function find(query) {
    try {
        let filters = [];
        if (query.name) {
            filters.push({ name: new RegExp(query.name, "i") });
        }
        if (query.code) {
            filters.push({ code: parseInt(query.code) });
        }
        if (query.type) {
            filters.push({ type: query.type });
        }
        if (query.createBy) {
            filters.push({ createBy: parseInt(query.createBy) });
        }
        if (query.updateBy) {
            filters.push({ updateBy: parseInt(query.updateBy) });
        }
        if (query.detail) {
            filters.push({ detail: new RegExp(query.detail, "i") });
        }
        const sort = { createAt: -1 };
        const skip = parseInt(query.skip) || 0;
        const limit = parseInt(query.limit) || 20;
        const populate = query.populate || false;
        let [appellations, totals] = await Promise.all([
            AppellationRepository.find(filters, skip, limit, sort, populate),
            AppellationRepository.countDocuments(filters)
        ])
        return { appellations, totals }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}