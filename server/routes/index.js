import { Router } from 'express';
const router = new Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('[ ⇩ Domain ⇩ ] ⇨ Time request: ', new Date().toLocaleString())
    next()
})

router.get('/', function (req, res) {
    res.send('Welcome to our HomePage!');
});


export default router;
