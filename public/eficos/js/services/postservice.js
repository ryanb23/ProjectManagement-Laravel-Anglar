// public/eficos/js/services/postservice.js

angular.module('postservice', [])

.factory('post', function($http) {

	return {
		// save a post
		save : function(postdata) {
			return $http({
				method: 'POST',
				url: 	'/api/posts',
				headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
				data: 	$.param(postdata)
			});
		}
	}
});