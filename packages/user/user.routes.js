const { Router } = require("express")
const router = new Router();
const UserController = require("./user.controller")
const { Authentication } = require("../../util/JWT/jwt")
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
module.exports = router