import { Router } from 'express';
const router = new Router();
import * as CountryController from "./country.controller";

// authen
// multer
// validation
// service


router.route('/all')
    .post(
        CountryController.addAllCountry
    );


router.route("/")
    .get(
        CountryController.find
    )

export default router