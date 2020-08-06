import { Router } from 'express';
const router = new Router();
import * as UserController from "./user.controller";
import { Authentication, AuthenticationPermission } from "../../util/JWT/jwt";
import { upload } from "../middleware/upload.multer";
// authen
// multer
// validation
// service
router.route("/find")
    .get(
        AuthenticationPermission,
        UserController.find
    )

router.route("/update-profile-admin")
    .put(
        AuthenticationPermission,
        UserController.updateProfileAdmin
    )
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

router.route("/reset-password")
    .post(
        Authentication,
        UserController.resetPassword
    )


router.route("/verify-email")
    .post(
        Authentication,
        UserController.verifyEmail
    )


router.route("/forgot-password")
    .post(
        UserController.forgotPassword
    )



export default router;