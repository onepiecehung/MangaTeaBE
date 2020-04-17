const Mangadex = require('mangadex-api')
const logger = require("../../util/logger")
const { Mal } = require("node-myanimelist");

// const get = new Mangadex()

// async function a(id) {
//     let data = await get.getManga(id)
//     console.log(data.length);
// }
// a(1)
// console.log(a(1))

Mal.anime(705).moreInfo().then(res => res.data)