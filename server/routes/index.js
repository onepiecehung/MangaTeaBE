const express = require("express");


const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('[ ⇩ Domain ⇩ ] ⇨ Time request: ', new Date().toLocaleString())
    next()
})

router.get('/', function (req, res) {
    res.send('Welcome to our HomePage!');
});


module.exports = router;
