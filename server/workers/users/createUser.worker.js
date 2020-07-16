require('@babel/register');
require('@babel/polyfill');
require("../../../database/mongo/init/toLocal");

// const UserRepository = require("../../../packages/repository/user.repository");
// const UserModel = require("../../../database/mongo/model/user.model");
const UserService = require("../../../packages/user/user.service");
const UserDataModel = require("./models/userData");
const UserIDModel = require("./models/userId");
const AnidbIDModel = require("./models/anidbID");
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
async function name() {
    let dataEmail = await UserDataModel.find().limit(3000).skip(50000);
    let dataId = await UserIDModel.find()
    for (let i = 0; i < dataId.length; i++) {
        let userInfo = {};
        userInfo._id = dataId[i].userID;
        userInfo.email = dataEmail[i].email;
        userInfo.password = "123456";
        userInfo.fullName = dataEmail[i].fullName || "NoName"
        userInfo.username = dataEmail[i].fullName.replace(/\s+/g, '') + makeid(2) || `userName${dataId[i].userID}`
        await UserService.Register(userInfo)
        console.log(`register -> ${userInfo.email} : done`);
    }

    console.log("********************************************************************Done");
}
name()