var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller.js');
var profileController = require('./server/controllers/profile-controller.js');
var tweetController = require('./server/controllers/tweet-controller.js');
var usersController = require('./server/controllers/users-controller.js');

mongoose.connect('mongodb://localhost:27017/online-presence');

app.use(multipartMiddleware);
app.use(bodyParser.json());
app.use('/app', express.static(__dirname + "/app"));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads',express.static(__dirname +"/uploads"));


app.get('/', function(req, res){
	res.sendfile('index.html');
});

//Authentication
app.post('/api/user/signup', authenticationController.signup);
app.post('/api/user/login', authenticationController.login);


//Profile
app.post('/api/profile/editPhoto',multipartMiddleware, profileController.updatePhoto);
app.post('/api/profile/updateUsername', profileController.updateUsername);
app.post('/api/profile/updateBio', profileController.updateBio);

//tweet
app.post('/api/tweet/post', tweetController.postTweet);
app.get('/api/tweet/get', tweetController.getTweets);

//user
app.get('/api/users/get', usersController.getUsers);

app.listen('3000', function(){
	console.log("Listening for local host 3000");
});