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

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}




async function run() {
    try {
        var sex = ["MALE", "FEMALE"]
        let userData = await UserModel.find()
        for (let i = 0; i < userData.length; i++) {
            // console.log(randomDate(new Date(1995, 0, 1), new Date(2007, 0, 1)));
            console.log(i + "/" + userData.length);
            // console.log(userData[i]._id);
            // console.log(sex[Math.round(Math.random())]);
            let gender = sex[Math.round(Math.random())];
            await UserModel.updateOne({ _id: userData[i]._id }, {
                gender: gender,
                birthday: randomDate(new Date(1995, 0, 1), new Date(2007, 0, 1))
            })
            console.log("Done: " + userData[i]._id + " --- " + gender);
        }
        console.log("==========> End");
    } catch (error) {
        console.log(error);
    }
}

// run()

async function name() {
    try {
        let userData = await UserModel.find({ gender: "FEMALE" }).limit(300)
        for (let i = 0; i < userData.length; i++) {
            console.log(i + "/" + userData.length);
            await UserModel.updateOne({ _id: userData[i]._id }, {
                gender: "MALE"
            })
            console.log("Done: " + userData[i]._id);
        }
        console.log("==========> End");
    } catch (error) {
        console.log(error);
    }
}

name()