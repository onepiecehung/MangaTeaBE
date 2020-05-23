import { Router } from 'express';

const router = new Router();

import * as CommentController from "./comment.controller"
import { Authentication } from "../../util/JWT/jwt"

router.route("/")
    .post(
        Authentication,
        CommentController.createAndUpdate
    )
    .get(
        CommentController.find
    )

export default router;