import { Router } from 'express';
const router = new Router();

import { upload } from "../middleware/upload.multer";

import { Authentication, AuthenticationCheckPoint } from "../../util/JWT/jwt";
import * as GroupTranslationController from "./groupTranslation.controller";


router.route("/")
    .post(
        AuthenticationCheckPoint,
        GroupTranslationController.createAndUpdate
    )
    .get(
        GroupTranslationController.find
    )

router.route("/upload")
    .post(
        Authentication,
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'cover', maxCount: 1 }
        ]),
        GroupTranslationController.upload
    )
export default router;