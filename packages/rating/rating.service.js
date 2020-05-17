import * as RatingRepository from "../repository/rating.repository";
import * as logger from "../../util/logger";



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
        let data = await RatingRepository.create(ratingInfo);
        return data;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}