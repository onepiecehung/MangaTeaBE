require("../../database/mongo/init/toLocal")
require('@babel/register');
require('@babel/polyfill');
const MangaRepository = require("../../packages/repository/manga.repository")
const anilist = require('anilist-node');
const Anilist = new anilist();
const logger = require("../../util/logger")
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function name(start) {
    try {
        var k = 0
        for (let i = start; i > 1020; i--) {
            k = i - 1
            await Anilist.media.manga(i).then(async data => {
                if (data.status == 404) {
                    logger.debug(`Khong tim thay id: ${i}`)
                    // logger.debug(data)
                    // await sleep(1000)
                    // name(k)
                }
                else {
                    let mangaTemp = {};
                    mangaTemp.name = data.title.romaji || null
                    mangaTemp.otherName = data.title || null
                    mangaTemp.idAniList = data.id || null
                    mangaTemp.idMal = data.idMal || null
                    mangaTemp.description = data.description || null
                    mangaTemp.format = data.format || null
                    mangaTemp.status = data.status || null
                    mangaTemp.startDate = data.startDate || null
                    mangaTemp.endDate = data.endDate || null
                    mangaTemp.countryOfOrigin = data.countryOfOrigin || null
                    mangaTemp.genres = data.genres || null
                    mangaTemp.coverImage = data.coverImage || null
                    mangaTemp.bannerImage = data.bannerImage || null
                    mangaTemp.averageScore = data.averageScore || null
                    mangaTemp.meanScore = data.meanScore || null
                    mangaTemp.popularity = data.popularity || null
                    mangaTemp.trending = data.trending || null
                    mangaTemp.tags = data.tags || null
                    mangaTemp.characters = data.characters || null
                    mangaTemp.isAdult = data.isAdult || null
                    mangaTemp.source = data.externalLinks || null
                    mangaTemp.externalLinks = data.externalLinks || null
                    mangaTemp.staff = data.staff || null
                    // console.log(mangaTemp);
                    await MangaRepository.create(mangaTemp)
                    logger.info(`Tim thay id: ${i} , da ghi thanh cong vao database`)
                }
            });
            // await sleep(1000)
        }
    } catch (error) {
        console.log();
        await sleep(5000)
        name(k)
    }
}

name(35899)




// Anilist.media.manga(851434).then(async data => {
//     console.log(data.status);

//     let mangaTemp = {};
//     mangaTemp.name = data.title.romaji;
//     mangaTemp.otherName = data.title;
//     mangaTemp.idAniList = data.id;
//     mangaTemp.idMal = data.idMal;
//     mangaTemp.description = data.description;
//     mangaTemp.format = data.format;
//     mangaTemp.status = data.status
//     mangaTemp.startDate = data.startDate;
//     mangaTemp.endDate = data.endDate;
//     mangaTemp.countryOfOrigin = data.countryOfOrigin;
//     mangaTemp.genres = data.genres;
//     mangaTemp.coverImage = data.coverImage;
//     mangaTemp.bannerImage = data.bannerImage;
//     mangaTemp.averageScore = data.averageScore;
//     mangaTemp.meanScore = data.meanScore;
//     mangaTemp.popularity = data.popularity;
//     mangaTemp.trending = data.trending;
//     mangaTemp.tags = data.tags;
//     mangaTemp.characters = data.characters;
//     mangaTemp.isAdult = data.isAdult
//     mangaTemp.source = data.externalLinks;
//     mangaTemp.externalLinks = data.externalLinks;
//     mangaTemp.staff = data.staff;
//     console.log(mangaTemp);
//     // await MangaRepository.create(mangaTemp)
// });