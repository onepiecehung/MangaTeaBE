import { Router } from 'express';
const router = new Router();
import * as GenreController from './genre.controller';


router.route("/all")
    .post(
        GenreController.autoCreateAllGenre
    )
router.route('/')
    .get(
        GenreController.getAllGenre
    );
router.route('/:id')
    .get(
        GenreController.getGenreById
    );
// router.route('/')
//     .post(
//         GenreController.createNewGenre
//     );
// router.route('/:id')
//   .put(
//     GenreController.updateGenreById
//   );
// router.route('/:id')
//   .delete(
//     GenreController.deleteGenreById
//   );

module.exports = router;
