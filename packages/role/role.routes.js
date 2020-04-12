const { Router } = require("express")
const router = new Router();
const RoleController = require("./role.controller")






router.route("/all")
    .post(
        RoleController.autoCreateAllRole
    )




module.exports = router