// public/eficos/js/controllers/mainctrl.js

angular.module('mainctrl', [])

// inject the post service into our controller
.controller('maincontroller', function($scope, $http, post) {
	// object to hold all the data for the new comment form
	$scope.postdata = {};

	// loading variable to show the spinning loading icon
	$scope.loading = true;

	// Get all posts 
	post.get()
		.success(function(data) {
			$scope.posts = data;
			$scope.loading = false;
		});

	// Save a comment
	$scope.submitpost = function() {
		alert("ok");
		$scope.loading = true;

		post.save($scope.postdata)
			.success(function(data) {
				post.get()
					.success(function(getdata){
						$scope.posts = getdata;
						$scope.loading = false;
					});
			})
			.error(function(data){
				console.log(data);
			});
	};

});