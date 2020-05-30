import { Router } from 'express';

const router = new Router();
import * as StatusController from "./status.controller";




router.route("/create")
    .post(
        StatusController.create
    );


router.route("/all")
    .post(
        StatusController.autoCreateAllStatus
    )

export default router;
