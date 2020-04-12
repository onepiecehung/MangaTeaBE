const CountryRepository = require("../repository/country.repository")
const logger = require("../../util/logger")
const axios = require("axios")
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