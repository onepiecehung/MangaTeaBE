const { Router } = require("express")
const router = new Router();
const MemberController = require("./member.controller")

// authen
// multer
// validation
// service


router.route('/:id')
    .get(
        MemberController.getMemberById
    );
    

module.exports = router