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

run()