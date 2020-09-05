import { Router } from 'express';

const router = new Router();
import swaggerSpec from '../bin/docs';
import swaggerUI from "swagger-ui-express";
import { detect } from 'detect-browser';
import { getIP, getClientIp } from "../../util/help";
import UserRouter from "../../packages/user/user.routes";
import MemberRouter from "../../packages/member/member.routes";
import CountryRouter from "../../packages/country/country.routes";
import StatusRouter from "../../packages/status/status.routes";
import RoleRouter from "../../packages/role/role.routes";
import GenreRouter from "../../packages/genre/genre.routes";
import MangaRouter from "../../packages/manga/manga.routes";
import RatingRouter from "../../packages/rating/rating.routes";
import CommentRouter from "../../packages/comment/comment.routes";
import AppellationRouter from "../../packages/appellation/appellation.routes";
import AuthorRouter from "../../packages/author/author.routes";
import GroupTranslationRouter from "../../packages/groupTranslation/groupTranslation.routes";
import ChapterRouter from "../../packages/chapter/chapter.routes";
import AdminRouter from "../../packages/admin/admin.routes";

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
router.use("/member", MemberRouter);
router.use("/country", CountryRouter);
router.use("/status", StatusRouter);
router.use("/role", RoleRouter);
router.use("/genre", GenreRouter);
router.use('/manga', MangaRouter);
router.use("/rating", RatingRouter);
router.use("/comment", CommentRouter);
router.use("/appellation", AppellationRouter);
router.use("/author", AuthorRouter);
router.use("/group", GroupTranslationRouter);
router.use("/chapter", ChapterRouter);
router.use("/admin", AdminRouter);

router.get('/', function (req, res) {
    res.send('Welcome to our API!');
});

// TODO api document
// app.use('/documents', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
router.use('/documents', swaggerUI.serve);
router.get('/documents', swaggerUI.setup(swaggerSpec));


export default router;
