"use script"
require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../database/mongo/init/toLocal")
const logger = require("../../util/logger")
const MangaRepository = require("../../packages/repository/manga.repository")
const ChapterRepository = require("../../packages/repository/chapter.repository")


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function name() {
    try {
        let data = await MangaRepository.find({})
        let chapter = await ChapterRepository.findArrayChapterV2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
        console.log(chapter);
        
        // for (let e of data) {
        //     if (e.chapter.length !== 0) {
        //         logger.log(`skipping => ${e._id}`)
        //     } else {
        //         let tempArrayChapter = [];
        //         let chapterLengthTemp = getRndInteger(5, 55);
        //         for (let i = 1; i < chapterLengthTemp; i++) {
        //             logger.info(`chapter ${i}/${chapterLengthTemp}`)
        //             let temp112 = getRndInteger(1, 12);
        //             let tempChapter = await ChapterRepository.create({
        //                 name: `Chapter ${i}`,
        //                 chapterNumber: i,
        //                 mangaID: e._id,
        //                 groupTranslation: 1,
        //                 photo: chapter[temp112].photo
        //             })
        //             tempArrayChapter.push(tempChapter._id);
        //         }
        //         await MangaRepository.findByIdAndUpdate(e._id, { chapter: tempArrayChapter })
        //     }
        //     logger.info(`Done: ${e._id}`)
        // }
        logger.info(`************************************** DONE ****`)
    } catch (error) {
        logger.error(error)
    }
}

name()
