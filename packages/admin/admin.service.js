import * as logger from "../../util/logger";

import * as UserAnalyzeRepository from "../repository/userAnalyze.repository";
import { update } from "../../database/mongo/model/manga.model";

export async function dashboard(query) {
    try {
        const {
            mostViewGenre
        } = query;
        if (mostViewGenre == 1) {
            let data = await UserAnalyzeRepository.find();
            return data;
        }
        return Promise.reject("Param not null or error");
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}

async function mostViewGenre(dataIn) {
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
        let isArray = Array.isArray(dataIn);
        if (!isArray) {
            dataIn = [dataIn]
        }
        let promise = dataIn.map(async e => {
            for (let key in e) {
                if (arrayData.includes(e[key]) === true) {
                    
                }
            }
        })
        let data = await Promise.all(promise);
        return isArray ? data : data[0];
    } catch (error) {
        logger.error(error);
        return dataIn;
    }
}