
// innovate Controller
modal.controller('innovatecontroller', function($scope, $http, $location, API_URL){

	$http.get(API_URL + "user")
		.success(function(response){
			$scope.user = response;
			//alert($.param($scope.user));
		});

	$scope.save = function(modalstate) {

		if(modalstate != 'save')
		{
			alert('publish');
			$scope.innovate.active = 1;
		} else
		{
			$scope.innovate.active =0;
		}

		$scope.innovate.contributor = $scope.user.name;
		$scope.innovate.user_id = $scope.user.id;
		$scope.innovate.user_img = $scope.user.img;
		alert($.param($scope.innovate));
		var url = API_URL + "innovate";
		$http({
			method: 'POST',
			url: url,
			data: $.param($scope.innovate),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			alert(response);
			console.log(response);
			$location.path("/discover");
		}).error(function(response){
			alert(response);
			console.log('error');
		});
	}

});

// Discover Controller
modal.controller('discovercontroller', function($scope, $http, $filter, innovateservice, API_URL){

	var url = API_URL + "discover";
	$http.get(url)
		.success(function(response){
			$scope.originprojects = response;
			$scope.projects = response;
		});
// Filter definition
	$scope.completedFilter = function(object) {
	    return object.department === "Human resources";
	}
	$scope.filterFinance = function(object) {
		return object.department === "Finance";
	}
	$scope.filterLegal = function(object) {
		return object.department === "Legal";
	}
	$scope.filterTechnology = function(object) {
		return object.department === "Technology";
	}
	// get comment number
	$scope.commentnumber = function(object) {
		var url = API_URL + "commentnumber";
		$http({
			method: 'POST',
			url: API_URL + 'getcomment',
			data: $.param(object),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			$scope.currentcomments = response;
			console.log("comments", response)
		}).error(function(response){
			alert('error');
		});
	}
// current projects save
	$scope.setValue = function(data) {
		innovateservice.set(data);
	}

	// filter function
		$scope.human = function(state){
			$scope.projects = $filter('filter')($scope.originprojects, state);
		}
});

// creative project controller as creative controller
modal.controller('creativecontroller', function($scope, $http, $route, API_URL, innovateservice){

	$scope.creative = innovateservice.get();

	// Get current user information
	$http.get(API_URL + "user")
		.success(function(response){
			$scope.user = response;
			var role = $scope.user.role;
		});
	$http({
		method: 'POST',
		url: API_URL + 'getcomment',
		data: $.param($scope.creative),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	}).success(function(response){
		$scope.comments = response;
		console.log("comments", response)
	}).error(function(response){
		alert('error');
	});
	// Save new comment
	$scope.profilecomment = function() {
		alert("ok");
		$scope.newcomment.photo = $scope.user.img;
		$scope.newcomment.author = $scope.user.name;
		$scope.newcomment.post_id = $scope.creative.id;
		var url = API_URL + "comment";
		$http({
			method: 'POST',
			url: url,
			data: $.param($scope.newcomment),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			console.log(response);
			$scope.comments.push(response) ;
			$scope.newcomment = {};
			// $route.reload();
		}).error(function(response){
			alert(response);
			console.log(response);
		});
	}
});

// Chat Controller
modal.controller('chatcontroller', function($scope, $interval, $filter, $rootScope, $http, $location, API_URL, chatservice){
	// Get All user information
	$http.get(API_URL + "alluser")
		.success(function(response){
			$scope.contacts = response;
		});
		$http.get(API_URL + "user")
			.success(function(response){
				$scope.user = response;
			});
	$interval(function () {
		var newurl = API_URL + "newchat";
		if($rootScope.curren == undefined)
		{
			$http.get(API_URL + "newchat")
				.success(function(response){
					// alert($.param(response));
					$rootScope.temp = response;
				});
		}
		else {
			$http({
				method: 'POST',
				url: newurl,
				data: $.param($rootScope.curren),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function(response){
				$rootScope.temp = response;
				if(response != ""){
					for(i=0; i<$rootScope.temp.length; i++){
						if($rootScope.temp[i].sender == $rootScope.curren.id)
						{
							$scope.chats.push($rootScope.temp[i]);
							 var scrollTop;
							 scrollTop=$(".ttl:last-child li").offset().top-$("div.chat").offset().top+$("div.chat").scrollTop();
							$("div.chat").scrollTop(parseInt(scrollTop));
						}
					}

				}
			});
		}
	}, 3000);
	$scope.currentcontact = function(contact) {
		$scope.current = contact;
		chatservice.set(contact);
		$rootScope.curren = contact;
		$scope.getcontent();
	}
	$scope.getcontent = function() {   // Get seen chat concerned with current contact
		var url = API_URL + "getchat";
		$http({
			method: 'POST',
			url: url,
			data: $.param($scope.current),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			$rootScope.chats = response;
			$location.path("/chat");
		});
	}
	// Send messages
	$scope.send = function(){
		$scope.sendmessage = {};
		$scope.sendmessage.id = $rootScope.curren.id;
		$scope.sendmessage.content = $scope.message;
		var url = API_URL + "sendmessage";
		$http({
			method: 'POST',
			url:	url,
			data:	$.param($scope.sendmessage),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).success(function(response){
			$rootScope.chats.push(response);
			$scope.message = "";
		});
	}
});
// Innovate Service
modal.factory('innovateservice', function(){
	var saveData = {};
	function set(data) {
		saveData = data;
	}
	function get() {
		return saveData;
	}
	return {
		set: set,
		get: get
	}
});
// Chat Service
modal.factory('chatservice', function(){
	var chatData = {};
	function set(data) {
		chatData = data;
	}
	function get() {
		return chatData;
	}
	return {
		set: set,
		get: get
	}
});
