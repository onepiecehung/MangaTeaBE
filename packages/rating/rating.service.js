const raccoon = require('raccoon');

import * as logger from "../../util/logger";

import * as RatingRepository from "../repository/rating.repository";

export async function create(ratingInfo) {
    try {
        let filter = [];
        filter.push({ userID: ratingInfo.userID });
        filter.push({ typeRating: ratingInfo.typeRating });
        if (ratingInfo.mangaID) {
            filter.push({ mangaID: ratingInfo.mangaID });
        }
        if (ratingInfo.groupTranslationID) {
            filter.push({ groupTranslationID: ratingInfo.groupTranslationID })
        }
        let checkUpdate = await RatingRepository.findOne(filter);
        if (checkUpdate && checkUpdate !== null && checkUpdate !== []) {
            checkUpdate.set("rateNumber", ratingInfo.rateNumber)
            if (ratingInfo.rateContent && ratingInfo.rateContent !== "") {
                checkUpdate.set("rateContent", ratingInfo.rateContent)
            }
            if (ratingInfo.status) {
                checkUpdate.set("status", ratingInfo.status)
            }
            await RatingRepository.save(checkUpdate)
            return true;
        }
        if (ratingInfo.rateNumber < 6 && ratingInfo.typeRating == "MANGA") {
            await raccoon.disliked(ratingInfo.userID, ratingInfo.mangaID)
        } else {
            await raccoon.liked(ratingInfo.userID, ratingInfo.mangaID)
        }
        let data = await RatingRepository.create(ratingInfo);
        return data;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

export async function find(query) {
    try {
        const {
            idManga,
            id,
            idUser,
            rateNumber
        } = query;
        let filter = [];
        const sort = { updatedAt: parseInt(query.sort) } || { updatedAt: -1 };
        const limit = parseInt(query.limit) || 20
        const skip = parseInt(query.skip) || 0
        if (idManga) {
            let rating = await RatingRepository.findRatingByMangaId(idManga);
            let data = await chartsRating(rating);
            return data;
        }
        if (id) {
            let data = await RatingRepository.findById(id);
            return data;
        }
        if (idUser) {
            filter.push({ userID: parseInt(idUser) })
        }
        if (rateNumber) {
            filter.push({ rateNumber: parseInt(rateNumber) })
        }
        console.log(filter);
        let [rating, total] = await Promise.all([
            RatingRepository.findAdv(filter, limit, skip > 0 ? (skip - 1) * limit : skip, sort),
            RatingRepository.countDocuments(filter)
        ])
        return { rating, total };
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

async function chartsRating(object) {
    try {
        let rating = {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0
        }
        for (let i = 0; i < object.length; i++) {
            rating[object[i].rateNumber] += 1
        }
        return { rating, total: object.length }
    } catch (error) {
        logger.error(error);
        return object;
    }
}