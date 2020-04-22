const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const {
    DATABASE
} = require("../../../server/config/constants")


const connection = mongoose.createConnection(DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.on('connected', () => {
    console.log(`[ Database =>] Connection to the database successful. ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.yellow)
})

connection.on("error", function (err) {
    console.log(`[ Database =>] The connection to the database failed: ${err}. = ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.red)
});


module.exports = connection;
