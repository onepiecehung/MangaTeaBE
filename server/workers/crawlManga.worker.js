require("colors")
const Mangadex = require('mangadex-api')
const logger = require("../../util/logger")
const GenreModel = require("../../database/mongo/model/genre.model")
const mongoose = require("mongoose")
const {
    SERVER, DATABASE, API_PATH
} = require("../config/constants")
mongoose.Promise = global.Promise;

mongoose
    .connect(DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            console.log(`[ Database =>] Connection to the database successful. ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.yellow)
        },
        err => console.log(`[ Database =>] The connection to the database failed: ${err}. = ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.red)
    );

// 22723


async function name() {
    try { await Mangadex.getManga(22723) } catch (e) { console.log('error here: ', e) }
}

// name()
async function name2() {
    let data = await GenreModel.find()
    console.log(data[0]);
}
name2()



// async function getManga(skip = 0) {
//     try {
//         var skip_t = 0
//         for (skip = 0; skip < 40; skip++) {
//             skip_t = skip
//             await Mangadex.getManga(2).then(({ manga, chapter }) => {
//                 console.log(`Manga ${manga.title} has ${chapter.length} chapters.`)
//             })
//         }

//     } catch (error) {
//         logger.error(error)
//         getManga(skip_t + 1)
//     }
// }


// getManga()