import { Router } from 'express';
const router = new Router();

import { AuthenticationPermission } from "../../util/JWT/jwt";
import * as AdminController from "./admin.controller";

router.route("/dashboard")
    .get(
        AuthenticationPermission,
        AdminController.dashboard
    )

export default router;