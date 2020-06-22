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
        let chapter = await ChapterRepository.findArrayChapterV2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
        // console.log(chapter);
        for (let i = 0; i < data.length; i++) {
            if (data[i].chapter.length !== 0) {
                logger.info(`skipping => ${data[i]._id}`)
            } else {
                let tempArrayChapter = [];
                let chapterLengthTemp = getRndInteger(5, 55);
                for (let i = 0; i < chapterLengthTemp; i++) {
                    logger.info(`chapter ${i}/${chapterLengthTemp}`)
                    let temp112 = getRndInteger(0, 14);
                    let tempChapter = await ChapterRepository.create({
                        name: `Chapter ${i + 1}`,
                        chapterNumber: i + 1,
                        mangaID: data[i]._id,
                        groupTranslation: 11,
                        language: 240,
                        updateBy: 31001,
                        createBy: 31001,
                        photo: chapter[temp112].photo
                    })
                    tempArrayChapter.push(tempChapter._id);
                }
                await MangaRepository.findByIdAndUpdate(data[i]._id, { chapter: tempArrayChapter })
            }
            logger.info(`Done: ${data[i]._id}`)
        }

        logger.info(`************************************** DONE ****`)
    } catch (error) {
        logger.error(error)
    }
}

name()
