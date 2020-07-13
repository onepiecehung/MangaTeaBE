require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../../database/mongo/init/toLocal")
const logger = require("../../../util/logger");
const MangaModel = require("../../../database/mongo/model/manga.model");
const Redis = require("../../../database/redis/client")

const ContentBasedRecommender = require('content-based-recommender')

const recommender = new ContentBasedRecommender({
    maxVectorSize: 100,// 100 is default
    minScore: 0.1,
    maxSimilarDocuments: 5,
    debug: true
});

async function getDocuments() {
    let documents = [];
    const myKey = "MangaObjRS";
    const value = await Redis.getJson(myKey);
    if (value) {
        for (let i = 0; i < value.length; i++) {
            if (value[i].genres.length == 0) {
                logger.info(`=> skip: ${value[i]._id}`);
            } else {
                let obj = {};
                obj.id = value[i]._id;
                let string = "";
                for (let j = 0; j < value[i].genres.length; j++) {
                    string = string + value[i].genres[j] + " ";
                }
                obj.content = string;
                documents.push(obj);
            }
        }
    } else {
        let mangaData = await MangaModel.find({}, {
            genres: 1
        })
        await Redis.setJson(myKey, mangaData, 36000);
        let data = await Redis.getJson(myKey);
        for (let i = 0; i < data.length; i++) {
            if (data[i].genres.length == 0) {
                logger.info(`=> skip: ${data[i]._id}`);
            } else {
                documents.push(data[i]);
            }
        }
    }
    return documents;
}

async function training() {
    let data = await getDocuments();
    // console.log(data);
    recommender.train(data);
    const similarDocuments = recommender.getSimilarDocuments('3', 0, 10);
    logger.info(similarDocuments)
}
training();

