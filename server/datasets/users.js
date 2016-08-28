var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
	email: String,
	username: String,
	password: String, // Not Secure
	bio: String,
	image: String,
	following: [{userId: String, username:String}],
	followers: [{userId: String, username: String}]
});