import { Router } from 'express';

const router = new Router();

import { AuthenticationPermission } from "../../util/JWT/jwt";
import * as AuthorController from "./author.controller";

router.route("/")
    .post(
        AuthenticationPermission,
        AuthorController.createAndUpdate
    )
    .get(
        AuthenticationPermission,
        AuthorController.find
    )


export default router;