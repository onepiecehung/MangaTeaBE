import * as logger from "../../util/logger";

import * as ChapterRepository from "../repository/chapter.repository";
import * as CommentRepository from "../repository/comment.repository";
import * as GroupTranslationRepository from "../repository/groupTranslation.repository";
import * as MangaRepository from "../repository/manga.repository";
import * as RatingRepository from "../repository/rating.repository";
import * as UserAnalyzeRepository from "../repository/userAnalyze.repository";
import * as UserRepository from "../repository/user.repository";

export async function dashboard(query) {
    try {
        const {
            mostViewGenre,
            percentMaleAndFemale,
            age,
            gender,
            total
        } = query;
        if (total == 1) {
            let totalUser = await UserRepository.countDocuments({});
            let totalChapter = await ChapterRepository.countDocuments({});
            let totalManga = await MangaRepository.countDocuments({});
            let totalRating = await RatingRepository.countDocuments({});
            let totalComment = await CommentRepository.countDocuments({});
            let totalGroup = await GroupTranslationRepository.countDocuments({});
            return { totalUser, totalChapter, totalManga, totalRating, totalComment, totalGroup }
        }
        if (mostViewGenre == 1) {
            let data = await UserAnalyzeRepository.find();
            let metaData = await mostViewGenres(data);
            return metaData;
        }
        if (percentMaleAndFemale == 1) {
            let dataMale = await UserAnalyzeRepository.countDocuments({ gender: "MALE" });
            let dataFemale = await UserAnalyzeRepository.countDocuments({ gender: "FEMALE" });
            return {
                male: dataMale,
                female: dataFemale,
                total: dataFemale + dataMale
            }
        }
        let filters = [];
        if (age) {
            filters.push({ age: parseInt(age) });
        }
        if (gender) {
            filters.push({ gender });
        }
        let data = await UserAnalyzeRepository.findAdv(filters);
        let metaData = await mostViewGenres(data);
        return metaData;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

async function mostViewGenres(dataIn) {
    try {
        const arrayData = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Hentai", "Historical", "Horror", "Josei", "Kids", "Magic", "MartialArts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "SciFi", "Seinen", "Shoujo", "ShoujoAi", "Shounen", "ShounenAi", "SliceOfLife", "Space", "Sports", "SuperPower", "Supernatural", "Thriller", "Vampire", "Yaoi", "Yuri", "Travel"];
        let update = {
            Action: 0,
            Adventure: 0,
            Cars: 0,
            Comedy: 0,
            Dementia: 0,
            Demons: 0,
            Drama: 0,
            Ecchi: 0,
            Fantasy: 0,
            Game: 0,
            Harem: 0,
            Hentai: 0,
            Historical: 0,
            Horror: 0,
            Josei: 0,
            Kids: 0,
            Magic: 0,
            MartialArts: 0,
            Mecha: 0,
            Military: 0,
            Music: 0,
            Mystery: 0,
            Parody: 0,
            Police: 0,
            Psychological: 0,
            Romance: 0,
            Samurai: 0,
            School: 0,
            SciFi: 0,
            Seinen: 0,
            Shoujo: 0,
            ShoujoAi: 0,
            Shounen: 0,
            ShounenAi: 0,
            SliceOfLife: 0,
            Space: 0,
            Sports: 0,
            SuperPower: 0,
            Supernatural: 0,
            Thriller: 0,
            Vampire: 0,
            Yaoi: 0,
            Yuri: 0,
            Travel: 0
        }

        for (let i = 0; i < dataIn.length; i++) {
            for (let j = 0; j < arrayData.length; j++) {
                update[arrayData[j]] += dataIn[i][arrayData[j]]
            }
        }
        let dataHentai = update.Hentai;
        update.Hentai = update.Harem;
        update.Harem = dataHentai;
        let total = await sumValueObject(update);
        return { genres: update, total };
    } catch (error) {
        logger.error(error);
        return error;
    }
}

async function sumValueObject(object) {
    try {
        let total = 0;
        for (let i in object) {
            total += object[i]
        }
        return total;
    } catch (error) {
        logger.error(error);
        return 0;
    }
}