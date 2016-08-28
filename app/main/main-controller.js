(function(){
	angular.module('OnlinePresence')
	.controller('MainController', ['$scope','$http', '$interval', 
							function($scope, $http, $interval){

		if(localStorage['User-Data'] !== undefined){
			$scope.user = JSON.parse(localStorage['User-Data']);
		}

		$scope.sendTweet = function(event){
			if(event.which === 13){
				var request = {
					user: $scope.user.username || $scope.user.email,
					userId: $scope.user._id,
					userImage: $scope.user.image,
					content: $scope.newTweet
				}

				$http.post('api/tweet/post', request).success(function(response){
					$scope.tweets = response;
				}).error(function(error){
					console.error(error);
				})
			}
		};

		function getTweets(initial){
			
			$http.get('api/tweet/get').success(function(response){
				
				if(initial){
					$scope.tweets = response;
				} else {
					if(response.length > $scope.tweets.length){
						$scope.incomingTweets = response;
					}
				}
			});
		};

		$scope.setNewTweets = function(){
			$scope.tweets = angular.copy($scope.incomingTweets);
			$scope.incomingTweets = undefined;
		};

		$interval(function(){
			getTweets(false);
			if($scope.incomingTweets){
				$scope.difference = $scope.incomingTweets.length - $scope.tweets.length;
			}
			console.log("This is working");
		},1000);

		

		getTweets(true);

	}]);
}());