import { AUTHOR } from "../../globalConstant/index";
import * as logger from "../../util/logger";

import * as AuthorRepository from "../repository/author.repository";



export async function createAndUpdate(data) {
    try {
        let authorInfo = data.body;
        let userInfo = data.user;
        if (authorInfo.id) {
            let checkAuthor = await AuthorRepository.findById(authorInfo.id);
            if (!checkAuthor) {
                return Promise.reject(new Error(AUTHOR.AUTHOR_ID_NOT_FOUND))
            }
            authorInfo.updateBy = userInfo._id;
            await AuthorRepository.findByIdAndUpdate(authorInfo.id, authorInfo);
            return true;
        }
        let checkExist = await AuthorRepository.findOne(authorInfo);
        if (checkExist) {
            return Promise.reject(new Error(AUTHOR.AUTHOR_IS_EXIST));
        }
        authorInfo.createBy = userInfo._id;
        authorInfo.updateBy = userInfo._id;
        let dataAuthor = await AuthorRepository.create(authorInfo);
        return dataAuthor;
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
        if (query.role) {
            filters.push({ role: query.role });
        }
        if (query.country) {
            filters.push({ country: query.country });
        }
        if (query.about) {
            filters.push({ about: new RegExp(query.about, "i") });
        }
        if (query.social) {
            filters.push({ social: new RegExp(query.social, "i") });
        }
        if (query.birthday) {
            filters.push({ birthday: new Date(birthday) });
        }
        if (query.createBy) {
            filters.push({ createBy: parseInt(query.createBy) });
        }
        if (query.updateBy) {
            filters.push({ updateBy: parseInt(query.updateBy) });
        }
        const sort = { createAt: -1 };
        const skip = parseInt(query.skip) || 0;
        const limit = parseInt(query.limit) || 20;
        const populate = query.populate || false;
        let [authors, totals] = await Promise.all([
            AuthorRepository.find(filters, skip, limit, sort, populate),
            AuthorRepository.countDocuments(filters)
        ])
        return { authors, totals }
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}