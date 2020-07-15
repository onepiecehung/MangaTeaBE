const path = require('path');

const dotEnvConfigs = {
    path: path.resolve(process.cwd(), '.env'),
};
require('dotenv').config(dotEnvConfigs);
require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../init/index")
var XLSX = require('xlsx')

const MangaModel = require("../../model/manga.model")

async function run() {
    try {
        var workbook = XLSX.readFile('./database/mongo/data/Content-based/content-based-description-limit27k-skip27k.csv');
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        for (let i = 0; i < xlData.length; i++) {
            console.log("=>>>>>>>>>>>>>>>Log: " + xlData[i].id);
            await MangaModel.updateOne({
                _id: xlData[i].id
            }, {
                $set: { suggestionDescription: JSON.parse(xlData[i].description) }
            })
        }
    } catch (error) {
        console.log(error);
    }
}

run()