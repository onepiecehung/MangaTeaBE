const path = require('path');
const dotEnvConfigs = {
    path: path.resolve(process.cwd(), '.env'),
};
require('dotenv').config(dotEnvConfigs);
require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../database/mongo/init/index")
const UserModel = require("../../database/mongo/model/user.model")
const MemberModel = require("../../database/mongo/model/member.model")
const UserAnalyzeModel = require("../../database/mongo/model/userAnalyze.model")
const MangaModel = require("../../database/mongo/model/manga.model")
const moment = require("moment")
const arrayData = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Hentai", "Historical", "Horror", "Josei", "Kids", "Magic", "Martial Arts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen", "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life", "Space", "Sports", "Super Power", "Supernatural", "Thriller", "Vampire", "Yaoi", "Yuri", "Travel"]
const arrayData2 = ["Action", "Adventure", "Cars", "Comedy", "Dementia", "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Hentai", "Historical", "Horror", "Josei", "Kids", "Magic", "MartialArts", "Mecha", "Military", "Music", "Mystery", "Parody", "Police", "Psychological", "Romance", "Samurai", "School", "SciFi", "Seinen", "Shoujo", "ShoujoAi", "Shounen", "ShounenAi", "SliceOfLife", "Space", "Sports", "SuperPower", "Supernatural", "Thriller", "Vampire", "Yaoi", "Yuri", "Travel"]


async function run() {
    try {
        let data = await MemberModel.find({
            // userID: 781
        }, {
            historyReading: 1,
            userID: 1,
        })
        for (let i = 0; i < data.length; i++) {
            console.log(`Process ${i + 1}/${data.length}`);
            let manga = await MangaModel.find({
                _id: {
                    $in: data[i].historyReading
                }
            }, {
                genres: 1
            })
            let update = {
                Action: 0,
                Adventure: 0,
                Cars: 0,
                Comedy: 0,
                Dementia: 0,
                Demons: 0,
                Drama: 0,
                Ecchi: 0,
                Fantasy: 0,
                Game: 0,
                Harem: 0,
                Hentai: 0,
                Historical: 0,
                Horror: 0,
                Josei: 0,
                Kids: 0,
                Magic: 0,
                MartialArts: 0,
                Mecha: 0,
                Military: 0,
                Music: 0,
                Mystery: 0,
                Parody: 0,
                Police: 0,
                Psychological: 0,
                Romance: 0,
                Samurai: 0,
                School: 0,
                SciFi: 0,
                Seinen: 0,
                Shoujo: 0,
                ShoujoAi: 0,
                Shounen: 0,
                ShounenAi: 0,
                SliceOfLife: 0,
                Space: 0,
                Sports: 0,
                SuperPower: 0,
                Supernatural: 0,
                Thriller: 0,
                Vampire: 0,
                Yaoi: 0,
                Yuri: 0,
                Travel: 0
            }
            for (let j = 0; j < manga.length; j++) {
                if (manga[j].genres.length > 0) {
                    for (let k = 0; k < manga[j].genres.length; k++) {
                        if (manga[j].genres[k] == "Martial Arts") {
                            update.MartialArts += 1;
                        } else if (manga[j].genres[k] == "Sci-Fi") {
                            update.SciFi += 1;
                        } else if (manga[j].genres[k] == "Shoujo Ai") {
                            update.ShoujoAi += 1;
                        } else if (manga[j].genres[k] == "Shounen Ai") {
                            update.ShounenAi += 1;
                        } else if (manga[j].genres[k] == "Slice of Life") {
                            update.SliceOfLife += 1;
                        } else {
                            let temp = manga[j].genres[k];
                            if (arrayData.includes(temp) == false) {
                                temp = temp.replace(/\s/g, '')
                                if (update[temp] == undefined) {
                                    update[temp] = 0
                                }
                            }
                            update[temp] += 1;
                        }
                    }
                }
            }
            // console.log(update);
            await UserAnalyzeModel.updateOne({
                userID: data[i].userID
            }, update)
            console.log(`DONE: ${data[i].userID}`);
        }
        console.log("END");
    } catch (error) {
        console.log(error);
    }
}

run()

async function createData() {
    try {
        let data = await UserModel.find({},
            {
                gender: 1,
                birthday: 1
            })
        for (let i = 0; i < data.length; i++) {
            console.log(`Process: ${i + 1}/${data.length}`);
            let tempData = {}
            tempData.gender = data[i].gender;
            tempData.userID = data[i]._id;
            tempData.age = parseInt(moment(data[i].birthday, "YYYYMMDD").fromNow().slice(0, 2));
            let tempAnalyze = new UserAnalyzeModel(tempData);
            await tempAnalyze.save()
            console.log("DONE => " + data[i]._id);
        }
        console.log("END");
    } catch (error) {
        console.log(error);
    }
}

// createData()