(function(){
	angular.module('OnlinePresence')
	.controller('FollowController', ['$scope','$http', function($scope, $http){
		$http.get('api/users/get').then(function(response){
			$scope.users = response.data;
			console.log($scope.users);
		})
	}]);
}());