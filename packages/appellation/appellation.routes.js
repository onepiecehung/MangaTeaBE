import { Router } from 'express';
const router = new Router();

import { AuthenticationPermission } from "../../util/JWT/jwt";
import * as AppellationController from "./appellation.controller";

router.route("/")
    .post(
        AuthenticationPermission,
        AppellationController.createAndUpdate
    )
    .get(
        AuthenticationPermission,
        AppellationController.find
    )

export default router;