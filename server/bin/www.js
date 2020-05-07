const path = require('path');
const dotEnvConfigs = {
    path: path.resolve(process.cwd(), '.env'),
};
require('@babel/register');
require('@babel/polyfill');
require('dotenv').config(dotEnvConfigs);
require("colors")
// require("../../database/redis/client")
require("./server")
require("../../database/mongo/init/index")