import { Router } from 'express';
const router = new Router();
import * as MemberController from "./member.controller";
import { Authentication } from "../../util/JWT/jwt";


// authen
// multer
// validation
// service

router.route("/user")
    .get(
        Authentication,
        MemberController.getMemberByIdUser
    );


router.route('/:id')
    .get(
        MemberController.getMemberById
    );


router.route("/save-manga")
    .post(
        Authentication,
        MemberController.saveManga
    )

router.route("/unsaved-manga")
    .post(
        Authentication,
        MemberController.unsavedManga
    )

router.route("/add-to-favorite")
    .post(
        Authentication,
        MemberController.addMangaFavorite
    )

router.route("/remove-from-favorite")
    .post(
        Authentication,
        MemberController.removeMangaFavorite
    )

router.route("/add-to-history")
    .post(
        Authentication,
        MemberController.addMangaHistory
    )

router.route("/remove-from-history")
    .post(
        Authentication,
        MemberController.removeMangaHistory
    )

router.route("/remove-all-history")
    .post(
        Authentication,
        MemberController.removeAllMangaHistory
    )

export default router;