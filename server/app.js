import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes/index"
import api from "./api/api"
import subdomain from 'express-subdomain';// TODO create subdomain
import cors from "cors"
import {
    SENTRY_DSN
} from "./config/constants";
import {
    CORS
} from "../globalConstant/index"

const {
    createQueue
} = require('./connector/rabbitmq/index');
const {
    testAMQP
} = require('./connector/rabbitmq/__test__/__test__.worker');

createQueue().then(() => {
    setTimeout(() => {
        testAMQP();
    }, 5000);
}).catch(error => {
    console.log('Error init rabbit : ', error);
});
const app = express();
//TODO: Sentry
const Sentry = require('@sentry/node');

Sentry.init({
    dsn: SENTRY_DSN
});
// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
// The error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

app.use(cors(CORS))


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());




// TODO setup subdomain, router
app.use(subdomain('api', api));
app.use("/", router)


// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// TODO Web Template Studio: Add your own error handler here.
if (process.env.NODE_ENV === "production") {
    // Do not send stack trace of error message when in production
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send("Error occurred while handling the request.");
    });
} else {
    // Log stack trace of error message while in development
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log(err);
        res.send(err.message);
    });
}




module.exports = app;
