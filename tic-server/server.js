var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var firebase = require('firebase');

var index = require('./routes/index');
var tasks = require('./routes/tasks');
var auth = require('./routes/auth');

var PORT = 3000;
var app = express();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjS5BZtLm0FN6RCOVzmgP2W34G82FAv7E",
    authDomain: "tic-app-5bc71.firebaseapp.com",
    databaseURL: "https://tic-app-5bc71.firebaseio.com",
    storageBucket: "tic-app-5bc71.appspot.com",
    messagingSenderId: "212963944061"
};

firebase.initializeApp(config);

// View Engine
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set static folder path
app.use('/static', express.static(path.join(__dirname, 'statics')));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Root path
app.use('/', index);
app.use('/api', tasks);
app.use('/api', auth);

// Server config
app.listen(PORT, function() {
    console.log("Server is listening on port: " + PORT);
});



