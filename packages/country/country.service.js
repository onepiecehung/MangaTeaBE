import axios from "axios";

import * as  logger from "../../util/logger";
import * as Redis from "../../database/redis/client";

import * as  CountryRepository from "../repository/country.repository";

export async function addAllCountry() {
    try {
        let data = await axios({
            method: 'get',
            url: 'https://restcountries.eu/rest/v2/all'
        });
        for (const i of data.data) {
            await CountryRepository.create({
                name: i.name,
                domain: i.topLevelDomain[0],
                language: i.demonym,
                capital: i.capital,
                nativeName: i.nativeName,
                alpha2Code: i.alpha2Code,
                alpha3Code: i.alpha3Code,
                callingCodes: i.callingCodes[0],
                region: i.region,
                subregion: i.subregion,
                cioc: i.cioc,
                flag: i.flag,
            })
        }
        return true
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}


export async function find(keyword) {
    try {
        const {
            domain,
            name,
            id
        } = keyword;
        if (id) {
            let myKey = `CountryInfo:${id}`;
            let value = await Redis.getJson(myKey);
            if (value) {
                return value;
            }
            let data = await CountryRepository.findById(id);
            await Redis.setJson(myKey, data, 300);
            return data;
        }
        let filters = [];
        if (name) {
            filters.push({ name: new RegExp(name, "i") });
        }
        if (domain) {
            filters.push({ domain: new RegExp(domain, "i") });
        }
        let data = await CountryRepository.find(filters);
        return data;
    } catch (error) {
        logger.error(error);
        return Promise.reject(error);
    }
}