import { Router } from 'express';

const router = new Router();

import * as RatingController from "./rating.controller";
import { Authentication } from "../../util/JWT/jwt";

router.route("/")
    .post(
        Authentication,
        RatingController.create
    )


export default router;