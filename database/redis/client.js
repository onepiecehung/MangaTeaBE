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
        client.on("connect", () => {
            console.log(`Connect to Redis success: ${client.options.localhost}:${client.options.port}`.cyan.bold);
        })
        client.on("ready", () => {
            console.log(`Redis is ready`.red.bold);
            console.log(`========== STATUS REDIS SERVER ==========`.red.bold);
            console.log(client);
            
        })
        return client;
    } else {
        console.log(`Connect to Redis success`.cyan.bold);
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
