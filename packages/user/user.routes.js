import { Router } from 'express';
const router = new Router();
import * as UserController from "./user.controller";
import { Authentication } from "../../util/JWT/jwt";
import { upload } from "../middleware/upload.multer";
// authen
// multer
// validation
// service


router.route('/register')
    .post(
        UserController.Register
    );

router.route('/login')
    .post(
        UserController.Login
    );

router.route("/me")
    .get(
        Authentication,
        UserController.Profile
    );

router.route("/:id")
    .get(
        UserController.getUserById
    );

router.route("/update-profile")
    .put(
        Authentication,
        UserController.updateProfile
    )

router.route("/change-password")
    .put(
        Authentication,
        UserController.changePassword
    )

router.route("/upload-avatar")
    .post(
        Authentication,
        upload.single("image"),
        UserController.uploadAvatar
    )

export default router;