var express = require('express');
var firebase = require('firebase');
var router = express.Router();


router.post('/signup', function(req, res, next) {
    var responseJSON = {
        'error': null,
        'error_status': {
            'email': {
                'email_already_in_use': null,
                'invalid_email': null,
                'operation_not_allowed': null
            },
            'password': {
                'weak_password': null,
                'invalid_password': null
            },
        },
        'success': false
    };

    if(!req.body.email || !req.body.password) {
        responseJSON.error_status.email.invalid_email = 'invalid_email';
        responseJSON.error_status.password.invalid_password = 'invalid_password';
        responseJSON.error = true;
        res.json(responseJSON);
    }

    firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
        .catch(function(err) {
            if(err) {
                responseJSON.error = true;

                if(err.code == 'auth/auth/email-already-in-use') {
                    responseJSON.error_status.email.email_already_in_use = 'email_already_in_use';
                }

                if(err.code == 'auth/invalid-email') {
                    responseJSON.error_status.email.invalid_email = 'invalid_email';
                    responseJSON.error_status.password = 'invalid_password';
                }

                if(err.code == 'auth/operation-not-allowed') {
                    responseJSON.error_status.email.operation_not_allowed = 'operation_not_allowed';
                }

                if(err.code == 'auth/weak-password') {
                    responseJSON.error_status.password.weak_password = 'weak_password';
                }
            } else {
                responseJSON.success = true;
            }

            res.json(responseJSON);
        });
});


router.post('/login', function(req, res, next) {
    var responseJSON = {
        'error': null,
        'error_status': {
            'email': {
                'invalid_email': null,
                'user_disabled': null,
                'user_not_found': null
            },
            'password': null,
        },
        'success': false
    };

    if(!req.body.email || !req.body.password) {
        responseJSON.error_status.email.invalid_email = 'invalid_email';
        responseJSON.error_status.password = 'invalid_password';
        responseJSON.success = true;
        res.json(responseJSON);
    }

    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
        .catch(function(err) {
            if(err) {
                responseJSON.success = true;

                if(err.code == 'auth/wrong-password') {
                    responseJSON.error_status.email.invalid_email = 'invalid_email';
                    responseJSON.error_status.password = 'invalid_password';
                }

                if(err.code == 'auth/invalid-email') {
                    responseJSON.error_status.email.invalid_email = 'invalid_email';
                    responseJSON.error_status.password = 'invalid_password';
                }

                if(err.code == 'auth/user-disabled') {
                    responseJSON.error_status.email.user_disabled = 'user_disabled';
                }

                if(err.code == 'auth/user-not-found') {
                    responseJSON.error_status.email.user_not_found = 'user_not_found';
                }
            } else {
                responseJSON.success = true;
            }

            res.json(responseJSON);
        });
});


router.post('/auth', function(req, res, next) {
    var responseJSON = {
        'user': null
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
            responseJSON.user = true;
        } else {
            responseJSON.user = false;
        }

        res.json(responseJSON);
    });
});


router.post('/reset-password', function(req, res, nex) {
    var responseJSON = {
        'error': null,
        'error_status': {
            'invalid_email': null,
            'user_not_found': null
        },
        'success': null
    }

    if(!req.body.email) {
        responseJSON.error = true;
        responseJSON.error_status.invalid_email = 'invalid_email';
        res.json(responseJSON);
    }

    firebase.auth().sendPasswordResetEmail(req.body.email)
        .catch(function(err) {
            if(err) {
                responseJSON.error = true;
                if(err.code == 'auth/invalid-email') {
                    responseJSON.error_status.invalid_email = 'invalid_email';
                }

                if(err.code == 'auth/user-not-found') {
                    responseJSON.error_status.user_not_found = 'user_not_found';
                }
            } else {
                responseJSON.success = true;
            }

            res.json(responseJSON);
        });
});


router.get('/sign-out', function(req, res, next) {
    var responseJSON = {
        'success': null
    }

    firebase.auth().signOut().catch(function(err) {
        responseJSON.success = true;
        res.json(responseJSON);
    });
});


module.exports = router;