const CountryModel = require("../../database/mongo/model/country.model")

export async function create(CountryInfo) {
    let CountryClass = new CountryModel(CountryInfo)
    return CountryClass.save()
}

export async function findById(id) {
    return CountryModel.findById(id)
}