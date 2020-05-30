import { Router } from 'express';

const router = new Router();
import * as RoleController from "./role.controller";






router.route("/all")
    .post(
        RoleController.autoCreateAllRole
    )




module.exports = router