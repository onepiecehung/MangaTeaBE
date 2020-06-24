import { Router } from 'express';

const router = new Router();

import { upload } from "../middleware/upload.multer";
import * as MangaController from './manga.controller';
import { AuthenticationChecking, AuthenticationCheckPoint } from "../../util/JWT/jwt";


router.route('/')
    .get(
        AuthenticationChecking,
        MangaController.find
    )
    .post(
        AuthenticationCheckPoint,
        upload.fields([
            { name: 'banner', maxCount: 1 },
            { name: 'cover', maxCount: 1 }
        ]),
        MangaController.createAndUpdate
    )


router.route("/home")
    .get(
        AuthenticationChecking,
        MangaController.findAtHome
    )

export default router;
