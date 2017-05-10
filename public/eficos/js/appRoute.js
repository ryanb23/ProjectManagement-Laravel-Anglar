var modal = angular.module('efico', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
        /* A. Standard User */

                // 0. Dashboard
                .when('/dashboard', {
                        templateUrl: 'views/dashboard.html'
                })
                // 1. Organization
                .when('/organization', {
                        templateUrl: 'views/organization.html'
                })
                // 2. Innovative Ideas
                .when('/discover', {
                        templateUrl: 'views/discover.html',
                        controller: 'discovercontroller'
                })
                .when('/creative-project', {
                        templateUrl: 'views/creative-project.html'
                })
                .when('/innovate', {
                        templateUrl: 'views/innovate.html',
                        controller: 'innovatecontroller'
                })
                // 3. Chat
                .when('/chat', {
                        templateUrl: 'views/chat.html',
												controller: 'chatcontroller'
                })
                // 4. Preferences
                .when('/preferences', {
                        templateUrl: 'views/account-preferences.html'
                })
                // 5. Profile
                .when('/profile', {
                        templateUrl: 'views/profile.html'
                })
                // 6. Settings
                .when('/settings', {
                        templateUrl: 'views/settings.html'
                })
                // 7. Documentation
                .when('/documentation', {
                        templateUrl: 'views/documentation.html'
                })

        /* B. Administrator */
                .when('/user-management', {
                        templateUrl: 'views/user-management.html'
                })
                .when('/departement-management', {
                        templateUrl: 'views/departement-management.html'
                })
                .when('/system-parameters', {
                        templateUrl: 'views/system-parameters.html'
                })
                .when('/reward-system', {
                        templateUrl: 'views/reward-system.html'
                })

        /* C. Redirection */
		.otherwise({
			redirectTo:  '/dashboard'
		});
}]);

modal.constant('API_URL', 'http://localhost:8000/api/');
