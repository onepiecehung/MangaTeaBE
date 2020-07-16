"use script"
require('@babel/register');
require('@babel/polyfill');
require("colors")
require("../../database/mongo/init/toLocal")
const logger = require("../../util/logger")
const MangaRepository = require("../../packages/repository/manga.repository")
const ChapterRepository = require("../../packages/repository/chapter.repository")
const MemberRepository = require("../../packages/repository/member.repository")
const GroupTranslation = require("../../packages/repository/groupTranslation.repository")
const MangaModel = require("../../database/mongo/model/manga.model")
const ChapterModel = require("../../database/mongo/model/chapter.model")

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
                let chapterLengthTemp = getRndInteger(5, 20);
                let groupTemp = getRndInteger(1, 10);
                for (let i = 0; i < chapterLengthTemp; i++) {
                    logger.info(`chapter ${i}/${chapterLengthTemp}`)
                    let temp112 = getRndInteger(0, 14);
                    let tempChapter = await ChapterRepository.create({
                        name: `Chapter ${i + 1}`,
                        chapterNumber: i + 1,
                        mangaID: data[i]._id,
                        groupTranslation: groupTemp,
                        language: 240,
                        updateBy: 31001,
                        createBy: 31001,
                        photo: chapter[temp112].photo
                    })
                    //todo: add to member
                    // await MemberRepository.addChapterUpload(31001, tempChapter._id);
                    //todo: add to group
                    await GroupTranslation.addChapter(groupTemp, tempChapter._id)
                    tempArrayChapter.push(tempChapter._id);
                }
                await MangaRepository.findByIdAndUpdate(data[i]._id, { chapter: tempArrayChapter })
            }
            logger.info(`===========================================================>  Done: ${data[i]._id}`)
        }

        logger.info(`************************************** DONE ****`)
    } catch (error) {
        logger.error(error)
    }
}

// name()

async function update2() {
    try {
        let manga = await MangaModel.find({}, {
            chapter: 1
        }).limit(35000).skip(20000)
        // console.log(manga[0]);
        let temp = manga.length;
        // for (let j = 0; j < manga[0].chapter.length; j++) {
        //     await ChapterModel.updateOne({ _id: manga[0].chapter[j] }, { mangaID: manga[0]._id })
        // }
        // logger.info(`Done============================================> id: ${manga[0]._id}`)
        for (let i = 0; i < manga.length; i++) {
            for (let j = 0; j < manga[i].chapter.length; j++) {
                await ChapterModel.updateOne({ _id: manga[i].chapter[j] }, { mangaID: manga[i]._id })
            }
            logger.info(`Done============================================> id: ${manga[i]._id}, process: ${i + 1}/${temp}`);
        }
        console.log(`All is done!`);

    } catch (error) {
        logger.error(error)
    }
}
update2()