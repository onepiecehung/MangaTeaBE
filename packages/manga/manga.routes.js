import { Router } from 'express';
const router = new Router();
import * as MangaController from './manga.controller';
import { AuthenticationChecking } from "../../util/JWT/jwt";

router.route('/')
    .get(
        AuthenticationChecking,
        MangaController.find
    );


export default router
