const express = require("express");
const router = express.Router();
const swaggerSpec = require('../bin/docs');
const swaggerUI = require("swagger-ui-express");
const { detect } = require('detect-browser');
const { getIP, getClientIp } = require("../../util/help")
const UserRouter = require("../../packages/user/user.routes")
const MemberRouter = require("../../packages/menber/member.routes")
const CountryRouter = require("../../packages/country/country.routes")
const StatusRouter = require("../../packages/status/status.routes")
const RoleRouter = require("../../packages/role/role.routes")
const GenreRouter = require("../../packages/genre/genre.routes")

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    var browser = detect(req.headers['user-agent']);
    if (browser) {
        browser = `${browser.name}, version: ${browser.version}, os: ${browser.os}, type: ${browser.type}` + `${browser.bot ? (", bot: ") + browser : "".random}`
    } else {
        browser = req.headers['user-agent']
    }
    // console.log(getClientIp());
    console.log(`[API]`.magenta.bold + ` Time request: ${new Date().toLocaleString()} by ${browser.cyan} from IP: ${getClientIp() ? getClientIp() + " - " + (getIP(req)) : getIP(req)}, `)
    next()
})



router.use('/user', UserRouter);
router.use("/member", MemberRouter)
router.use("/country", CountryRouter)
router.use("/status", StatusRouter)
router.use("/role", RoleRouter)
router.use("/genre", GenreRouter)
// router.use('/genre', genreRouter);


router.get('/', function (req, res) {
    res.send('Welcome to our API!');
});

// TODO api document
// app.use('/documents', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/documents', swaggerUI.serve);
router.get('/documents', swaggerUI.setup(swaggerSpec));


module.exports = router;
