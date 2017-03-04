var express = require('express');
var firebase = require('firebase');
var router = express.Router();

// Api urls
router.post('/tasks', function(req, res, next) {
    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .catch(err => console.log(err));
    res.send("Account with " + req.body.email + " has been created successfully");
});

router.get('/logout', function(req, res, next) {
    firebase.auth().signOut();
        res.send("You are logged out successfully");
});

module.exports = router;