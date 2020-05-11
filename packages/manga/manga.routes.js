const { Router } = require("express");
const router = new Router();
const MangaController = require('./manga.controller');

router.route('/')
    .get(
        MangaController.find
    );


module.exports = router;
