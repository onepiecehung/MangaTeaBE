const mongoose = require("mongoose");
// TODO setup database
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://localhost:27017/truyentranh_0621_1630`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(
        () => {
            console.log(`[ Database =>] Connection to the database successful. mongodb://localhost:27017/truyentranh`)
        });
