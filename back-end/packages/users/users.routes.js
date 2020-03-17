var passport = require('passport');
require("../../config/passport")(passport);
var express = require('express');
var router = express.Router();
let UserController = require('./users.controller');
const multer = require('multer');
const checkPermission = require("../../config/CheckPermission");

var storage = multer.diskStorage({
    // file upload destination
    destination: function (req, file, callback) {
        callback(null, './public/upload/avatar');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage });

router.get('/', function (req, res) {
    res.send('Welcome to our API users!');
});

router.get("/decodeToken/:token", UserController.decodeJWT)
router.post("/decodeTokenHeader", UserController.decodeJWT2)

router.get('/logout', passport.authenticate('jwt', { session: false }), UserController.LogOut);

router.post('/signup', UserController.SignUp);

router.put('/profile', checkPermission.usedLogin, upload.single('image'), UserController.updateUserProfile);

router.post('/signin', UserController.SignIn);

//TODO: check id unique
router.get("/uscheck/:username", UserController.usCheck);

router.post('/forgot-password/', UserController.forgotPassword);

router.post('/reset-password/:token', UserController.resetPassword);

router.get('/recharge/:idStudent', checkPermission.isAdmin, UserController.recharge);

router.get('/withdrawal/:idTeacher', UserController.withdrawal);

router.post('/change-password', UserController.changePassword);

router.get('/income', checkPermission.isAdmin, UserController.getIncomeAdmin);

router.get('/test', checkPermission.usedLogin, (req, res) => {
    res.send({
        "use-jwt": req.user
    })
});
//TODO: info user
router.get("/info/:id", UserController.infoUser);

module.exports = router;
