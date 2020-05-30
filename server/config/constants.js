
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
    URL_DB_LOCAL: process.env.URL_DB_LOCAL || `mongodb://localhost:27017/${NAME_DB}`,
    URL_DB: process.env.URL_DB || `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${URL_HOST}/${NAME_DB}?retryWrites=true&w=majority` || URL_DB_LOCAL
}


export const SENTRY_DSN = process.env.SENTRY_DSN || `https://f8d024586a034c8fbcbeda728a6819eb@o381083.ingest.sentry.io/5207860`
export const CLIENT_ID_IMGUR = process.env.CLIENT_ID_IMGUR || `35fc7e0355c68dc`

