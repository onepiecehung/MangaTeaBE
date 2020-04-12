const { Router } = require("express")
const router = new Router();
const CountryController = require("./country.controller")

// authen
// multer
// validation
// service


router.route('/all') 
    .post(
        CountryController.addAllCountry
    );


module.exports = router