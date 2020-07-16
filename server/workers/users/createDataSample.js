require('@babel/register');
require('@babel/polyfill');
require("../../../database/mongo/init/toLocal");

const RatingTempModel = require("./models/ratingTemp");
const RatingModel = require("../../../packages/repository/rating.repository");
const MemberModel = require("../../../database/mongo/model/member.model");
const MangaModel = require("../../../database/mongo/model/manga.model");

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
async function name() {
    try {
        let data = await RatingTempModel.find();
        for (let i = 0; i < data.length; i++) {
            //Create rating
            if (data[i].rating == "like") {
                let dataJSON = {};
                dataJSON.userID = data[i].userID;
                dataJSON.mangaID = data[i].posterID;
                dataJSON.rateNumber = getRndInteger(8, 10);
                await RatingModel.create(dataJSON);
                console.log(`rating like -> ${dataJSON.rateNumber}`);
            }
            if (data[i].rating == "favorite") {
                let dataJSON = {};
                dataJSON.userID = data[i].userID;
                dataJSON.mangaID = data[i].posterID;
                dataJSON.rateNumber = getRndInteger(7, 10);
                await RatingModel.create(dataJSON);
                await MemberModel.update({ userID: data[i].userID }, {
                    $push: { mangaFavorite: data[i].posterID }
                })
                console.log(`rating favorite -> ${dataJSON.rateNumber}`);
            }
            if (data[i].rating == "neutral") {
                let dataJSON = {};
                dataJSON.userID = data[i].userID;
                dataJSON.mangaID = data[i].posterID;
                dataJSON.rateNumber = getRndInteger(5, 10);
                await RatingModel.create(dataJSON);
                console.log(`rating neutral -> ${dataJSON.rateNumber}`);
            }
            if (data[i].rating == "dislike") {
                let dataJSON = {};
                dataJSON.userID = data[i].userID;
                dataJSON.mangaID = data[i].posterID;
                dataJSON.rateNumber = getRndInteger(1, 5);
                await RatingModel.create(dataJSON);
                console.log(`rating dislike -> ${dataJSON.rateNumber}`);
            }
            //Add to history reading
            await MemberModel.update({ userID: data[i].userID }, {
                $push: { historyReading: data[i].posterID }
            })
            //Add to following manga
            await MangaModel.update({
                _id: data[i].posterID
            }, {
                $push: { userFollowedID: data[i].userID }
            })
            console.log(`----------> Done: ${i}`);

        }

        console.log(`***********************Done`);
    } catch (error) {
        console.log(error);
    }
}

// name()

async function name1() {
    try {
        let data = await RatingTempModel.find();
        for (let i = 0; i < data.length; i++) {
            //Create rating
            // if (data[i].rating == "like") {
            //     let dataJSON = {};
            //     dataJSON.userID = data[i].userID;
            //     dataJSON.mangaID = data[i].posterID;
            //     dataJSON.rateNumber = getRndInteger(8, 10);
            //     await RatingModel.create(dataJSON);
            //     console.log(`rating like -> ${dataJSON.rateNumber}`);
            // }
            // if (data[i].rating == "favorite") {
            //     let dataJSON = {};
            //     dataJSON.userID = data[i].userID;
            //     dataJSON.mangaID = data[i].posterID;
            //     dataJSON.rateNumber = getRndInteger(7, 10);
            //     await RatingModel.create(dataJSON);
            //     await MemberModel.update({ userID: data[i].userID }, {
            //         $push: { mangaFavorite: data[i].posterID }
            //     })
            //     console.log(`rating favorite -> ${dataJSON.rateNumber}`);
            // }
            // if (data[i].rating == "neutral") {
            //     let dataJSON = {};
            //     dataJSON.userID = data[i].userID;
            //     dataJSON.mangaID = data[i].posterID;
            //     dataJSON.rateNumber = getRndInteger(5, 10);
            //     await RatingModel.create(dataJSON);
            //     console.log(`rating neutral -> ${dataJSON.rateNumber}`);
            // }
            // if (data[i].rating == "dislike") {
            //     let dataJSON = {};
            //     dataJSON.userID = data[i].userID;
            //     dataJSON.mangaID = data[i].posterID;
            //     dataJSON.rateNumber = getRndInteger(1, 5);
            //     await RatingModel.create(dataJSON);
            //     console.log(`rating dislike -> ${dataJSON.rateNumber}`);
            // }
            // //Add to history reading
            // await MemberModel.update({ userID: data[i].userID }, {
            //     $push: { historyReading: data[i].posterID }
            // })
            //Add to following manga
            await MangaModel.update({
                _id: data[i].posterID
            }, {
                $push: { userFollowedID: data[i].userID }
            })
            console.log(`----------> Done: ${i}`);

        }

        console.log(`***********************Done`);
    } catch (error) {
        console.log(error);
    }
}

name1()