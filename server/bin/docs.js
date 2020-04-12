const swaggerJSDoc = require('swagger-jsdoc');
const CONSTANTS = require("../config/constants");


const swaggerDefinition = {
    info: {
        description: "This is a APIs documents",
        version: "1.0.3",
        title: "TruyenTranh API service",
        contact: {
            email: "16520479@gm.uit.edu.vn"
        },
        license: {
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    host: `api.manga.net:${CONSTANTS.PORT}`,
    // bashPath: "/v1",
    produces: ['application/json'],
    consumes: ['application/json'],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ JWT: [] }],
};

const options = {
    swaggerDefinition,
    apis: [
        'server/doc/validatorErrorHandler.js',
        'server/apis/*/*.docs.js',
        'server/apis/*/*.model.js',
    ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

