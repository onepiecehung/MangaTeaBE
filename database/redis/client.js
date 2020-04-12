const Redis = require("ioredis");

let client;
const timeEX = 120;
function init() {
    if (!client) {
        //default connect redis localhost:3306
        client = new Redis();
        client.on("error", (err) => {
            console.log(`Connect to Redis fail, you need install redis or start service redis`.red.bold);
            console.error(err);
        });
        return client;
    } else {
        console.log(`Connect to Redis success`.bgYellow.bold);
        return client;
    }
}

client = init();


async function setJson(key, value, time) {
    if (!time) {
        time = timeEX;
    }
    value = JSON.stringify(value);
    return client.set(key, value, "EX", time);
}

async function getJson(key) {
    let data = await client.get(key);
    if (data) data = JSON.parse(data);
    return data;
}

module.exports = {
    setJson,
    getJson
};
