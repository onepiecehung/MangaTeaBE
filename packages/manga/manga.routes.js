import { Router } from 'express';
const router = new Router();
import * as MangaController from './manga.controller';

router.route('/')
    .get(
        MangaController.find
    );


export default router
