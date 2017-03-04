var express = require('express');
var firebase = require('firebase');
var router = express.Router();


// Root Url
router.get('/', function(req, res, next) {
    res.render('index.html');
});

module.exports = router