import { Router } from 'express';

const router = new Router();

import { upload } from "../middleware/upload.multer";

import * as ChapterController from "./chapter.controller";
import { Authentication, AuthenticationChecking } from "../../util/JWT/jwt";





router.route("/")
    .get(
        AuthenticationChecking,
        ChapterController.find
    )
    .post(
        Authentication,
        upload.fields([
            { name: "image", maxCount: 100 },
            { name: "zip", maxCount: 1 }
        ]),
        ChapterController.createAndUpdate
    )

export default router;