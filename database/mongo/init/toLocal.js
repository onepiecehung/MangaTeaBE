const mongoose = require("mongoose");
const {
    SERVER, DATABASE, API_PATH
} = require("../../../server/config/constants");
// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb+srv://onepiecehung:Hung01684657540@3hmanga-p9tow.gcp.mongodb.net/truyentranh?retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            console.log(`[ Database =>] Connection to the database successful. mongodb://localhost:27017/truyentranh`)
        },
        err => console.log(`[ Database =>] The connection to the database failed: ${err}. = ${DATABASE.URL_DB ? DATABASE.URL_DB : DATABASE.URL_DB_LOCAL}`.red)
    );
