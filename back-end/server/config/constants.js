﻿
/**
 * @param SERVER
 * @param SERVER.PORT
 * @param SERVER.URL_API_HOST
 */
export const API_PATH = process.env.API_PATH || `api`
export const SERVER = {
    PORT: process.env.PORT || `2111`,
    URL_API_HOST: process.env.URL_API_HOST || `${API_PATH}.manga.net`,
    DOCS_PATH: process.env.DOCS_PATH || `documents`
}

/**
 * @param DATABASE
 * @param DATABASE.SECRET
 * @param DATABASE.URL_DB
 * @param DATABASE.USER_DB
 * @param DATABASE.PASSWORD_DB
 * @param DATABASE.URL_HOST
 * @param DATABASE.URL_DB
 * @param DATABASE.URL_LOCAL
 */

export const SECRET = process.env.SECRET || 'F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgV'
export const USER_DB = process.env.USER_DB || `onepiecehung`
export const PASSWORD_DB = process.env.PASSWORD_DB || `Hung01684657540`
export const NAME_DB = process.env.NAME_DB || `truyentranh`
export const URL_HOST = process.env.NAME_DB || `3hmanga-p9tow.gcp.mongodb.net`

export const DATABASE = {
    SECRET: process.env.SECRET || 'F)J@NcRfUjXn2r5u8x/A%D*G-KaPdSgV',
    USER_DB: process.env.USER_DB || `onepiecehung`,
    PASSWORD_DB: process.env.PASSWORD_DB || `Hung01684657540`,
    NAME_DB: process.env.NAME_DB || `truyentranh`,
    URL_HOST: process.env.NAME_DB || `3hmanga-p9tow.gcp.mongodb.net`,
    URL_DB_LOCAL: process.env.URL_DB_LOCAL || `mongodb://localhost:27017/${NAME_DB}`,
    URL_DB: process.env.URL_DB || `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${URL_HOST}/${NAME_DB}?retryWrites=true&w=majority` || URL_DB_LOCAL
}

/**
 * @param RABBIT
 * @param RABBIT.URL
 */

export const RABBIT_URL = process.env.RABBIT_URL || `amqp://user:bitnami@localhost:5672`;