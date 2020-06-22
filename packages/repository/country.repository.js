const CountryModel = require("../../database/mongo/model/country.model")

export async function create(CountryInfo) {
    let CountryClass = new CountryModel(CountryInfo)
    return CountryClass.save()
}

export async function findById(id) {
    return CountryModel.findById(id)
}

export async function findForChapter(id) {
    return CountryModel.findOne({
        _id: id
    }, {
        language: 1,
        alpha2Code: 1,
        nativeName: 1,
        flag: 1,
    })
}