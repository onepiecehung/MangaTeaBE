const { Router } = require("express");
const router = new Router();
const GenreController = require('./genre.controller');
router.route("/all")
    .post(
        GenreController.autoCreateAllGenre
    )
// router.route('/')
//   .get(
//     GenreController.getAllGenre
//   );
// router.route('/:id')
//   .get(
//     GenreController.getGenReById
//   );
// router.route('/')
//   .post(
//     GenreController.createNewGenre
//   );
// router.route('/:id')
//   .put(
//     GenreController.updateGenreById
//   );
// router.route('/:id')
//   .delete(
//     GenreController.deleteGenreById
//   );

module.exports = router;
