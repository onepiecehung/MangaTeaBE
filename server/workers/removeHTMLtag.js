const path = require('path');
const dotEnvConfigs = {
    path: path.resolve(process.cwd(), '.env'),
};
require('dotenv').config(dotEnvConfigs);
require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../database/mongo/init/index")


const MangaModel = require("../../database/mongo/model/manga.model")

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function run() {
    try {
        let data = await MangaModel.find()
        for (let i = 0; i < data.length; i++) {
            console.log("Process: " + i + "/" + data.length);
            if (data[i].description == null) {
                console.log("========> skip: " + data[i]._id);
            } else {
                console.log(data[i]._id);
                let temp = data[i].description;
                temp = temp.replace(/<[^>]*>?/gm, '');
                // console.log(data[i]._id + ": " + temp);
                await MangaModel.updateOne({ _id: data[i]._id }, { description: temp })
            }
        }
        console.log("Done");
    } catch (error) {
        console.log(error);
    }
}

// run()

async function removeImgHentai() {
    try {
        let data1 = await MangaModel.find({ genres: { $nin: ["Hentai"] } });
        let data2 = await MangaModel.find({ genres: /Hentai/i });
        for (let i = 0; i < data2.length; i++) {
            console.log("Process: " + i + data2.length);
            if (data2[i].coverImage) {
                await MangaModel.updateOne({ _id: data2[i]._id }, { coverImage: data1[getRndInteger(0, data1.length)].coverImage })
            }
        }
        // console.log(data1[1]);
        // console.log(data2[1]);
        console.log("DONE");
    } catch (error) {
        console.log(error);
    }
}

removeImgHentai()