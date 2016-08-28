var Tweet = require('../datasets/tweets');

module.exports.postTweet = function(req,res){
	var tweet = new Tweet(req.body);

	tweet.save();

	Tweet.find({})
		.sort({date: -1}).exec(function(err, allTweets){
		if(err){
			res.error(error);
		} else {
			res.json(allTweets);
		}
	});
}

module.exports.getTweets = function(req,res){
	
	Tweet.find({})
		.sort({date: -1})
		.exec(function(err, allTweets){
			if (err) {
				res.error(err);
			} else{
				res.json(allTweets);
			}
		})
}