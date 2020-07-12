require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../../database/mongo/init/toLocal")

const Redis = require("../../../database/redis/client")
const logger = require("../../../util/logger");
const raccoon = require('raccoon');
const RatingModel = require("../../../database/mongo/model/rating.model");

raccoon.config.className = 'manga';

async function run() {
    const myKey = "RatingPoint";
    const value = await Redis.getJson(myKey);
    if (value) {
        for (let i = 0; i < value.length; i++) {
            logger.warn(`process: ${i}/${value.length}`)
            if (value[i].rateNumber < 6) {
                await raccoon.disliked(value[i].userID, value[i].mangaID)
            } else {
                await raccoon.liked(value[i].userID, value[i].mangaID)
            }
        }
    } else {
        let ratingData = await RatingModel.find({}, {
            userID: 1,
            mangaID: 1,
            rateNumber: 1
        })
        await Redis.setJson(myKey, ratingData, 360);
        for (let i = 0; i < ratingData.length; i++) {
            logger.warn(`process: ${i}/${ratingData.length}`)
            if (ratingData[i].rateNumber < 6) {
                await raccoon.disliked(ratingData[i].userID, ratingData[i].mangaID)
            } else {
                await raccoon.liked(ratingData[i].userID, ratingData[i].mangaID)
            }
        }
    }
}
run().then(() => {
    raccoon.recommendFor(2057, 30).then((results) => {
        logger.info(2057, results);
    });
    raccoon.recommendFor(339, 30).then((results) => {
        logger.info(339, results);
    });
    raccoon.recommendFor(211, 30).then((results) => {
        logger.info(211, results);
    });
})

// raccoon.recommendFor(2057, 30).then((results) => {
//     logger.info(2057, results);
// });
// raccoon.recommendFor(339, 30).then((results) => {
//     logger.info(339, results);
// });
// raccoon.recommendFor(211, 30).then((results) => {
//     logger.info(211, results);
// });




