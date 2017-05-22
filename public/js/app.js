/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(4);

	__webpack_require__(9);

	__webpack_require__(17);

	__webpack_require__(31);

	__webpack_require__(35);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app', ['app.run', 'app.filters', 'app.services', 'app.components', 'app.routes', 'app.config', 'app.partials']);

	angular.module('app.run', []);
	angular.module('app.routes', []);
	angular.module('app.filters', []);
	angular.module('app.services', []);
	angular.module('app.config', []);
	angular.module('app.components', ['ui.router', 'angular-loading-bar', 'restangular', 'ngStorage', 'satellizer', 'mm.acl']);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _routes = __webpack_require__(3);

	angular.module('app.run').run(_routes.RoutesRun);

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	RoutesRun.$inject = ["$rootScope", "$state", "$auth", "AclService", "$timeout", "API", "ContextService"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RoutesRun = RoutesRun;
	function RoutesRun($rootScope, $state, $auth, AclService, $timeout, API, ContextService) {
	  'ngInject';

	  AclService.resume();

	  /*eslint-disable */
	  var deregisterationCallback = $rootScope.$on('$stateChangeStart', function (event, toState) {
	    if (toState.data && toState.data.auth) {
	      if (!$auth.isAuthenticated()) {
	        event.preventDefault();
	        return $state.go('login');
	      }
	    }

	    $rootScope.bodyClass = 'hold-transition login-page';
	  });

	  function stateChange() {
	    $timeout(function () {
	      // fix sidebar
	      var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
	      var window_height = $(window).height();
	      var sidebar_height = $('.sidebar').height();

	      if ($('body').hasClass('fixed')) {
	        $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
	      } else {
	        if (window_height >= sidebar_height) {
	          $('.content-wrapper, .right-side').css('min-height', window_height - neg);
	        } else {
	          $('.content-wrapper, .right-side').css('min-height', sidebar_height);
	        }
	      }

	      // get user current context
	      if ($auth.isAuthenticated() && !$rootScope.me) {
	        ContextService.getContext().then(function (response) {
	          response = response.plain();
	          $rootScope.me = response.data;
	        });
	      }
	    });
	  }

	  $rootScope.$on('$destroy', deregisterationCallback);
	  $rootScope.$on('$stateChangeSuccess', stateChange);
	  /*eslint-enable */
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _acl = __webpack_require__(5);

	var _routes = __webpack_require__(6);

	var _loading_bar = __webpack_require__(7);

	var _satellizer = __webpack_require__(8);

	angular.module('app.config').config(_acl.AclConfig).config(_routes.RoutesConfig).config(_loading_bar.LoadingBarConfig).config(_satellizer.SatellizerConfig);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	AclConfig.$inject = ["AclServiceProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AclConfig = AclConfig;
	function AclConfig(AclServiceProvider) {
	  'ngInject';

	  var myConfig = {
	    storage: 'localStorage',
	    storageKey: 'AppAcl'
	  };

	  /*eslint-disable */
	  AclServiceProvider.config(myConfig);
	  /*eslint-enable */
	}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider) {
	    'ngInject';

	    var getView = function getView(viewName) {
	        return './views/app/pages/' + viewName + '/' + viewName + '.page.html';
	    };

	    var getLayout = function getLayout(layout) {
	        return './views/app/pages/layout/' + layout + '.page.html';
	    };

	    $urlRouterProvider.otherwise('/');
	    $stateProvider.state('app', {
	        abstract: true,
	        views: {
	            'layout': {
	                templateUrl: getLayout('layout')
	            },
	            'header@app': {
	                templateUrl: getView('header')
	            },
	            'footer@app': {
	                templateUrl: getView('footer')
	            },
	            main: {}
	        },
	        data: {
	            bodyClass: 'hold-transition skin-blue sidebar-mini'
	        }
	    }).state('app.landing', {
	        url: '/',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                templateUrl: getView('landing')
	            }
	        }
	    }).state('app.contacts', {
	        url: '/contacts',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<contacts></contacts>'
	            }
	        }
	    }).state('app.projects', {
	        url: '/projects',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<projects></projects>'
	            }
	        }
	    }).state('app.project-create', {
	        url: '/project-create',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<project-create></project-create>'
	            }
	        }
	    }).state('app.project-view', {
	        url: '/project-view',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<project-view></project-view>'
	            }
	        }
	    }).state('app.chat', {
	        url: '/chat',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<chat></chat>'
	            }
	        }
	    }).state('login', {
	        url: '/login',
	        views: {
	            'layout': {
	                templateUrl: getView('login')
	            },
	            'header@app': {},
	            'footer@app': {}
	        },
	        data: {
	            bodyClass: 'hold-transition login-page'
	        },
	        params: {
	            registerSuccess: null,
	            successMsg: null
	        }
	    }).state('loginloader', {
	        url: '/login-loader',
	        views: {
	            'layout': {
	                templateUrl: getView('login-loader')
	            },
	            'header@app': {},
	            'footer@app': {}
	        },
	        data: {
	            bodyClass: 'hold-transition login-page'
	        }
	    }).state('register', {
	        url: '/register',
	        views: {
	            'layout': {
	                templateUrl: getView('register')
	            },
	            'header@app': {},
	            'footer@app': {}
	        },
	        data: {
	            bodyClass: 'hold-transition register-page'
	        }
	    }).state('userverification', {
	        url: '/userverification/:status',
	        views: {
	            'layout': {
	                templateUrl: getView('user-verification')
	            }
	        },
	        data: {
	            bodyClass: 'hold-transition login-page'
	        },
	        params: {
	            status: null
	        }
	    }).state('forgot_password', {
	        url: '/forgot-password',
	        views: {
	            'layout': {
	                templateUrl: getView('forgot-password')
	            },
	            'header@app': {},
	            'footer@app': {}
	        },
	        data: {
	            bodyClass: 'hold-transition login-page'
	        }
	    }).state('reset_password', {
	        url: '/reset-password/:email/:token',
	        views: {
	            'layout': {
	                templateUrl: getView('reset-password')
	            },
	            'header@app': {},
	            'footer@app': {}
	        },
	        data: {
	            bodyClass: 'hold-transition login-page'
	        }
	    }).state('app.logout', {
	        url: '/logout',
	        views: {
	            'main@app': {
	                controller: ["$rootScope", "$scope", "$auth", "$state", "AclService", function controller($rootScope, $scope, $auth, $state, AclService) {
	                    $auth.logout().then(function () {
	                        delete $rootScope.me;
	                        AclService.flushRoles();
	                        AclService.setAbilities({});
	                        $state.go('login');
	                    });
	                }]
	            }
	        }
	    });
	    // $stateProvider
	    //   .state('app', {
	    //     abstract: true,
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getLayout('layout')
	    //       },
	    //       'header@app': {
	    //         templateUrl: getView('header')
	    //       },
	    //       'footer@app': {
	    //         templateUrl: getView('footer')
	    //       },
	    //       main: {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition skin-blue sidebar-mini'
	    //     }
	    //   })
	    //   .state('app.landing', {
	    //     url: '/',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         templateUrl: getView('landing')
	    //       }
	    //     }
	    //   })
	    //   .state('app.tablessimple', {
	    //     url: '/tables-simple',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<tables-simple></tables-simple>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.uiicons', {
	    //     url: '/ui-icons',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<ui-icons></ui-icons>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.uimodal', {
	    //     url: '/ui-modal',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<ui-modal></ui-modal>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.uitimeline', {
	    //     url: '/ui-timeline',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<ui-timeline></ui-timeline>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.uibuttons', {
	    //     url: '/ui-buttons',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<ui-buttons></ui-buttons>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.uigeneral', {
	    //     url: '/ui-general',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<ui-general></ui-general>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.formsgeneral', {
	    //     url: '/forms-general',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<forms-general></forms-general>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.chartjs', {
	    //     url: '/charts-chartjs',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<charts-chartjs></charts-chartjs>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.comingsoon', {
	    //     url: '/comingsoon',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<coming-soon></coming-soon>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.profile', {
	    //     url: '/profile',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-profile></user-profile>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null
	    //     }
	    //   })
	    //   .state('app.userlist', {
	    //     url: '/user-lists',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-lists></user-lists>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.useredit', {
	    //     url: '/user-edit/:userId',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-edit></user-edit>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null,
	    //       userId: null
	    //     }
	    //   })
	    //   .state('app.userroles', {
	    //     url: '/user-roles',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-roles></user-roles>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.userpermissions', {
	    //     url: '/user-permissions',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-permissions></user-permissions>'
	    //       }
	    //     }
	    //   })
	    //   .state('app.userpermissionsadd', {
	    //     url: '/user-permissions-add',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-permissions-add></user-permissions-add>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null
	    //     }
	    //   })
	    //   .state('app.userpermissionsedit', {
	    //     url: '/user-permissions-edit/:permissionId',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-permissions-edit></user-permissions-edit>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null,
	    //       permissionId: null
	    //     }
	    //   })
	    //   .state('app.userrolesadd', {
	    //     url: '/user-roles-add',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-roles-add></user-roles-add>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null
	    //     }
	    //   })
	    //   .state('app.userrolesedit', {
	    //     url: '/user-roles-edit/:roleId',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<user-roles-edit></user-roles-edit>'
	    //       }
	    //     },
	    //     params: {
	    //       alerts: null,
	    //       roleId: null
	    //     }
	    //   })
	    //   .state('app.widgets', {
	    //     url: '/widgets',
	    //     data: {
	    //       auth: true
	    //     },
	    //     views: {
	    //       'main@app': {
	    //         template: '<widgets></widgets>'
	    //       }
	    //     }
	    //   })
	    //   .state('login', {
	    //     url: '/login',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('login')
	    //       },
	    //       'header@app': {},
	    //       'footer@app': {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition login-page'
	    //     },
	    //     params: {
	    //       registerSuccess: null,
	    //       successMsg: null
	    //     }
	    //   })
	    //   .state('loginloader', {
	    //     url: '/login-loader',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('login-loader')
	    //       },
	    //       'header@app': {},
	    //       'footer@app': {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition login-page'
	    //     }
	    //   })
	    //   .state('register', {
	    //     url: '/register',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('register')
	    //       },
	    //       'header@app': {},
	    //       'footer@app': {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition register-page'
	    //     }
	    //   })
	    //   .state('userverification', {
	    //     url: '/userverification/:status',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('user-verification')
	    //       }
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition login-page'
	    //     },
	    //     params: {
	    //       status: null
	    //     }
	    //   })
	    //   .state('forgot_password', {
	    //     url: '/forgot-password',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('forgot-password')
	    //       },
	    //       'header@app': {},
	    //       'footer@app': {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition login-page'
	    //     }
	    //   })
	    //   .state('reset_password', {
	    //     url: '/reset-password/:email/:token',
	    //     views: {
	    //       'layout': {
	    //         templateUrl: getView('reset-password')
	    //       },
	    //       'header@app': {},
	    //       'footer@app': {}
	    //     },
	    //     data: {
	    //       bodyClass: 'hold-transition login-page'
	    //     }
	    //   })
	    //   .state('app.logout', {
	    //     url: '/logout',
	    //     views: {
	    //       'main@app': {
	    //         controller: function ($rootScope, $scope, $auth, $state, AclService) {
	    //           $auth.logout().then(function () {
	    //             delete $rootScope.me
	    //             AclService.flushRoles()
	    //             AclService.setAbilities({})
	    //             $state.go('login')
	    //           })
	    //         }
	    //       }
	    //     }
	    //   })
	}

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	LoadingBarConfig.$inject = ["cfpLoadingBarProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LoadingBarConfig = LoadingBarConfig;
	function LoadingBarConfig(cfpLoadingBarProvider) {
	  'ngInject';

	  cfpLoadingBarProvider.includeSpinner = true;
	}

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	SatellizerConfig.$inject = ["$authProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SatellizerConfig = SatellizerConfig;
	function SatellizerConfig($authProvider) {
	  'ngInject';

	  $authProvider.httpInterceptor = function () {
	    return true;
	  };

	  $authProvider.loginUrl = '/api/auth/login';
	  $authProvider.signupUrl = '/api/auth/register';
	  $authProvider.tokenRoot = 'data'; // compensates success response macro
	}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _date_millis = __webpack_require__(10);

	var _capitalize = __webpack_require__(11);

	var _human_readable = __webpack_require__(12);

	var _truncate_characters = __webpack_require__(13);

	var _truncate_words = __webpack_require__(14);

	var _trust_html = __webpack_require__(15);

	var _ucfirst = __webpack_require__(16);

	angular.module('app.filters').filter('datemillis', _date_millis.DateMillisFilter).filter('capitalize', _capitalize.CapitalizeFilter).filter('humanreadable', _human_readable.HumanReadableFilter).filter('truncateCharacters', _truncate_characters.TruncatCharactersFilter).filter('truncateWords', _truncate_words.TruncateWordsFilter).filter('trustHtml', _trust_html.TrustHtmlFilter).filter('ucfirst', _ucfirst.UcFirstFilter);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DateMillisFilter = DateMillisFilter;
	function DateMillisFilter() {
	  'ngInject';

	  return function (input) {
	    return Date.parse(input);
	  };
	}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CapitalizeFilter = CapitalizeFilter;
	function CapitalizeFilter() {
	  return function (input) {
	    return input ? input.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
	      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	    }) : '';
	  };
	}

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HumanReadableFilter = HumanReadableFilter;
	function HumanReadableFilter() {
	  return function humanize(str) {
	    if (!str) {
	      return '';
	    }
	    var frags = str.split('_');
	    for (var i = 0; i < frags.length; i++) {
	      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
	    }
	    return frags.join(' ');
	  };
	}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncatCharactersFilter = TruncatCharactersFilter;
	function TruncatCharactersFilter() {
	  return function (input, chars, breakOnWord) {
	    if (isNaN(chars)) {
	      return input;
	    }
	    if (chars <= 0) {
	      return '';
	    }
	    if (input && input.length > chars) {
	      input = input.substring(0, chars);

	      if (!breakOnWord) {
	        var lastspace = input.lastIndexOf(' ');
	        // Get last space
	        if (lastspace !== -1) {
	          input = input.substr(0, lastspace);
	        }
	      } else {
	        while (input.charAt(input.length - 1) === ' ') {
	          input = input.substr(0, input.length - 1);
	        }
	      }
	      return input + '...';
	    }
	    return input;
	  };
	}

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TruncateWordsFilter = TruncateWordsFilter;
	function TruncateWordsFilter() {
	  return function (input, words) {
	    if (isNaN(words)) {
	      return input;
	    }
	    if (words <= 0) {
	      return '';
	    }
	    if (input) {
	      var inputWords = input.split(/\s+/);
	      if (inputWords.length > words) {
	        input = inputWords.slice(0, words).join(' ') + '...';
	      }
	    }
	    return input;
	  };
	}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.TrustHtmlFilter = TrustHtmlFilter;
	function TrustHtmlFilter($sce) {
	  return function (html) {
	    return $sce.trustAsHtml(html);
	  };
	}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UcFirstFilter = UcFirstFilter;
	function UcFirstFilter() {
	  return function (input) {
	    if (!input) {
	      return null;
	    }
	    return input.substring(0, 1).toUpperCase() + input.substring(1);
	  };
	}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _chat = __webpack_require__(18);

	var _projectCreate = __webpack_require__(19);

	var _projects = __webpack_require__(20);

	var _projectView = __webpack_require__(21);

	var _contacts = __webpack_require__(22);

	var _dashboard = __webpack_require__(23);

	var _navSidebar = __webpack_require__(24);

	var _navHeader = __webpack_require__(25);

	var _loginLoader = __webpack_require__(26);

	var _resetPassword = __webpack_require__(27);

	var _forgotPassword = __webpack_require__(28);

	var _loginForm = __webpack_require__(29);

	var _registerForm = __webpack_require__(30);

	angular.module('app.components')
	// .component('tablesSimple', TablesSimpleComponent)
	// .component('uiModal', UiModalComponent)
	// .component('uiTimeline', UiTimelineComponent)
	// .component('uiButtons', UiButtonsComponent)
	// .component('uiIcons', UiIconsComponent)
	// .component('uiGeneral', UiGeneralComponent)
	// .component('formsGeneral', FormsGeneralComponent)
	// .component('chartsChartjs', ChartsChartjsComponent)
	// .component('widgets', WidgetsComponent)
	// .component('userProfile', UserProfileComponent)
	// .component('userVerification', UserVerificationComponent)
	// .component('comingSoon', ComingSoonComponent)
	// .component('userEdit', UserEditComponent)
	// .component('userPermissionsEdit', UserPermissionsEditComponent)
	// .component('userPermissionsAdd', UserPermissionsAddComponent)
	// .component('userPermissions', UserPermissionsComponent)
	// .component('userRolesEdit', UserRolesEditComponent)
	// .component('userRolesAdd', UserRolesAddComponent)
	// .component('userRoles', UserRolesComponent)
	// .component('userLists', UserListsComponent)
	.component('chat', _chat.ChatComponent).component('projectView', _projectView.ProjectViewComponent).component('projectCreate', _projectCreate.ProjectCreateComponent).component('projects', _projects.ProjectsComponent).component('contacts', _contacts.ContactsComponent).component('dashboard', _dashboard.DashboardComponent).component('navSidebar', _navSidebar.NavSidebarComponent).component('navHeader', _navHeader.NavHeaderComponent).component('loginLoader', _loginLoader.LoginLoaderComponent).component('resetPassword', _resetPassword.ResetPasswordComponent).component('forgotPassword', _forgotPassword.ForgotPasswordComponent).component('loginForm', _loginForm.LoginFormComponent).component('registerForm', _registerForm.RegisterFormComponent); // import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
	// import { UiModalComponent } from './app/components/ui-modal/ui-modal.component'
	// import { UiTimelineComponent } from './app/components/ui-timeline/ui-timeline.component'
	// import { UiButtonsComponent } from './app/components/ui-buttons/ui-buttons.component'
	// import { UiIconsComponent } from './app/components/ui-icons/ui-icons.component'
	// import { UiGeneralComponent } from './app/components/ui-general/ui-general.component'
	// import { FormsGeneralComponent } from './app/components/forms-general/forms-general.component'
	// import { ChartsChartjsComponent } from './app/components/charts-chartjs/charts-chartjs.component'
	// import { WidgetsComponent } from './app/components/widgets/widgets.component'
	// import { UserProfileComponent } from './app/components/user-profile/user-profile.component'
	// import { UserVerificationComponent } from './app/components/user-verification/user-verification.component'
	// import { ComingSoonComponent } from './app/components/coming-soon/coming-soon.component'
	// import { UserEditComponent } from './app/components/user-edit/user-edit.component'
	// import { UserPermissionsEditComponent } from './app/components/user-permissions-edit/user-permissions-edit.component'
	// import { UserPermissionsAddComponent } from './app/components/user-permissions-add/user-permissions-add.component'
	// import { UserPermissionsComponent } from './app/components/user-permissions/user-permissions.component'
	// import { UserRolesEditComponent } from './app/components/user-roles-edit/user-roles-edit.component'
	// import { UserRolesAddComponent } from './app/components/user-roles-add/user-roles-add.component'
	// import { UserRolesComponent } from './app/components/user-roles/user-roles.component'
	// import { UserListsComponent } from './app/components/user-lists/user-lists.component'

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ChatController = function () {
	  ChatController.$inject = ["API", "$scope", "ContextService", "$anchorScroll"];
	  function ChatController(API, $scope, ContextService, $anchorScroll) {
	    'ngInject';

	    var _this = this;

	    _classCallCheck(this, ChatController);

	    this.API = API;
	    this.message = '';
	    API.all('users').get('all-chat-user').then(function (response) {
	      _this.chatUsers = response.plain().data;
	    });

	    API.all('users').get('me').then(function (response) {
	      var data = response.plain().data;
	      _this.userInfo = data;

	      //Subscribe to the channel we specified in our Laravel Event
	      console.log('chat-channel-' + data.id);
	      var channel = pusher.subscribe('chat-channel-' + data.id);
	      var that = _this;
	      //Bind a function to a Event (the full Laravel class)
	      channel.bind('App\\Events\\MessagePostEvent', function (messageData) {
	        console.log(messageData);
	        console.log(that.openChanelId);
	        if (messageData.user.id == that.openChanelId) {
	          that.addMessage(messageData);
	          $scope.$apply();
	        }
	      });
	    });
	  }

	  _createClass(ChatController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }, {
	    key: 'addMessage',
	    value: function addMessage(message) {
	      this.messageList.push(message);
	    }
	  }, {
	    key: 'openChanel',
	    value: function openChanel(userInfo) {
	      var _this2 = this;

	      this.openChanelId = userInfo.id;
	      this.API.one('message', 'message-with').get({ with_id: this.openChanelId }).then(function (response) {
	        _this2.messageList = response.plain().data;
	      });
	    }
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(message) {
	      var _this3 = this;

	      if (message == '') return;
	      this.message = '';
	      var newMessage = { to_id: this.openChanelId, message: message };

	      this.API.all('message/create').post(newMessage).then(function (response) {
	        _this3.addMessage({ message: message, to_id: _this3.openChanelId, user: _this3.userInfo });
	      });
	    }
	  }]);

	  return ChatController;
	}();

	var ChatComponent = exports.ChatComponent = {
	  templateUrl: './views/app/components/chat/chat.component.html',
	  controller: ChatController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProjectCreateController = function ProjectCreateController($scope) {
	  'ngInject';

	  _classCallCheck(this, ProjectCreateController);

	  $scope.test = 'test';
	};
	ProjectCreateController.$inject = ["$scope"];

	var ProjectCreateComponent = exports.ProjectCreateComponent = {
	  templateUrl: './views/app/components/project-create/project-create.component.html',
	  controller: ProjectCreateController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProjectsController = function ProjectsController($scope) {
	  'ngInject';

	  _classCallCheck(this, ProjectsController);

	  $scope.test = 'test';
	};
	ProjectsController.$inject = ["$scope"];

	var ProjectsComponent = exports.ProjectsComponent = {
	  templateUrl: './views/app/components/projects/projects.component.html',
	  controller: ProjectsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ProjectViewController = function ProjectViewController($scope) {
	  'ngInject';

	  _classCallCheck(this, ProjectViewController);

	  $scope.test = 'test';
	};
	ProjectViewController.$inject = ["$scope"];

	var ProjectViewComponent = exports.ProjectViewComponent = {
	  templateUrl: './views/app/components/project-view/project-view.component.html',
	  controller: ProjectViewController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContactsController = function ContactsController($scope) {
	  'ngInject';

	  _classCallCheck(this, ContactsController);

	  $scope.test = 'test';
	};
	ContactsController.$inject = ["$scope"];

	var ContactsComponent = exports.ContactsComponent = {
	  templateUrl: './views/app/components/contacts/contacts.component.html',
	  controller: ContactsController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DashboardController = function DashboardController($scope) {
	  'ngInject';

	  _classCallCheck(this, DashboardController);

	  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	  $scope.onClick = function () {};

	  $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	  $scope.pieData = [300, 500, 100];
	};
	DashboardController.$inject = ["$scope"];

	var DashboardComponent = exports.DashboardComponent = {
	  templateUrl: './views/app/components/dashboard/dashboard.component.html',
	  controller: DashboardController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavSidebarController = function () {
	  NavSidebarController.$inject = ["AclService", "ContextService"];
	  function NavSidebarController(AclService, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavSidebarController);

	    var navSideBar = this;
	    this.can = AclService.can;

	    ContextService.me(function (data) {
	      navSideBar.userData = data;
	    });
	  }

	  _createClass(NavSidebarController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavSidebarController;
	}();

	var NavSidebarComponent = exports.NavSidebarComponent = {
	  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
	  controller: NavSidebarController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavHeaderController = function () {
	  NavHeaderController.$inject = ["$rootScope", "ContextService"];
	  function NavHeaderController($rootScope, ContextService) {
	    'ngInject';

	    _classCallCheck(this, NavHeaderController);

	    var navHeader = this;

	    ContextService.me(function (data) {
	      navHeader.userData = data;
	    });
	  }

	  _createClass(NavHeaderController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return NavHeaderController;
	}();

	var NavHeaderComponent = exports.NavHeaderComponent = {
	  templateUrl: './views/app/components/nav-header/nav-header.component.html',
	  controller: NavHeaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginLoaderController = function LoginLoaderController($state, $auth, API, AclService) {
	  'ngInject';

	  _classCallCheck(this, LoginLoaderController);

	  API.oneUrl('authenticate').one('user').get().then(function (response) {
	    if (!response.error) {
	      var data = response.data;

	      angular.forEach(data.userRole, function (value) {
	        AclService.attachRole(value);
	      });

	      AclService.setAbilities(data.abilities);
	      $auth.setToken(data.token);
	      $state.go('app.landing');
	    }
	  });
	};
	LoginLoaderController.$inject = ["$state", "$auth", "API", "AclService"];

	var LoginLoaderComponent = exports.LoginLoaderComponent = {
	  templateUrl: './views/app/components/login-loader/login-loader.component.html',
	  controller: LoginLoaderController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ResetPasswordController = function () {
	  ResetPasswordController.$inject = ["API", "$state"];
	  function ResetPasswordController(API, $state) {
	    'ngInject';

	    _classCallCheck(this, ResetPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.alerts = [];
	  }

	  _createClass(ResetPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.password = '';
	      this.password_confirmation = '';
	      this.isValidToken = false;
	      this.formSubmitted = false;

	      this.verifyToken();
	    }
	  }, {
	    key: 'verifyToken',
	    value: function verifyToken() {
	      var _this = this;

	      var email = this.$state.params.email;
	      var token = this.$state.params.token;

	      this.API.all('auth/password').get('verify', {
	        email: email, token: token }).then(function () {
	        _this.isValidToken = true;
	      }, function () {
	        _this.$state.go('app.landing');
	      });
	    }
	  }, {
	    key: 'submit',
	    value: function submit(isValid) {
	      var _this2 = this;

	      if (isValid) {
	        this.alerts = [];
	        var data = {
	          email: this.$state.params.email,
	          token: this.$state.params.token,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };

	        this.API.all('auth/password/reset').post(data).then(function () {
	          _this2.$state.go('login', { successMsg: 'Your password has been changed, You may now login.' });
	        }, function (res) {
	          var alrtArr = [];

	          angular.forEach(res.data.errors, function (value) {
	            alrtArr = { type: 'error', 'title': 'Error!', msg: value[0] };
	          });

	          _this2.alerts.push(alrtArr);
	        });
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }]);

	  return ResetPasswordController;
	}();

	var ResetPasswordComponent = exports.ResetPasswordComponent = {
	  templateUrl: './views/app/components/reset-password/reset-password.component.html',
	  controller: ResetPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ForgotPasswordController = function () {
	  ForgotPasswordController.$inject = ["API", "$state"];
	  function ForgotPasswordController(API, $state) {
	    'ngInject';

	    _classCallCheck(this, ForgotPasswordController);

	    this.API = API;
	    this.$state = $state;
	    this.formSubmitted = false;
	    this.serverError = '';
	  }

	  _createClass(ForgotPasswordController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	    }
	  }, {
	    key: 'submit',
	    value: function submit() {
	      var _this = this;

	      this.serverError = '';

	      this.API.all('auth/password/email').post({
	        email: this.email
	      }).then(function () {
	        _this.$state.go('login', { successMsg: 'Please check your email for instructions on how to reset your password.' });
	      }, function (res) {
	        for (var error in res.data.errors) {
	          _this.serverError += res.data.errors[error] + ' ';
	        }
	        _this.formSubmitted = true;
	      });
	    }
	  }]);

	  return ForgotPasswordController;
	}();

	var ForgotPasswordComponent = exports.ForgotPasswordComponent = {
	  templateUrl: './views/app/components/forgot-password/forgot-password.component.html',
	  controller: ForgotPasswordController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LoginFormController = function () {
	  LoginFormController.$inject = ["$rootScope", "$auth", "$state", "$stateParams", "API", "AclService"];
	  function LoginFormController($rootScope, $auth, $state, $stateParams, API, AclService) {
	    'ngInject';

	    _classCallCheck(this, LoginFormController);

	    delete $rootScope.me;

	    this.$auth = $auth;
	    this.$state = $state;
	    this.$stateParams = $stateParams;
	    this.AclService = AclService;

	    this.registerSuccess = $stateParams.registerSuccess;
	    this.successMsg = $stateParams.successMsg;
	    this.loginfailederror = '';
	    this.loginfailed = false;
	    this.unverified = false;
	  }

	  _createClass(LoginFormController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.email = '';
	      this.password = '';
	    }
	  }, {
	    key: 'login',
	    value: function login() {
	      var _this = this;

	      this.loginfailederror = '';
	      this.loginfailed = false;
	      this.unverified = false;

	      var user = {
	        email: this.email,
	        password: this.password
	      };
	      this.$auth.login(user).then(function (response) {
	        var data = response.data.data;
	        var AclService = _this.AclService;

	        angular.forEach(data.userRole, function (value) {
	          AclService.attachRole(value);
	        });

	        AclService.setAbilities(data.abilities);
	        _this.$auth.setToken(response.data);
	        _this.$state.go('app.landing');
	      }).catch(this.failedLogin.bind(this));
	    }
	  }, {
	    key: 'failedLogin',
	    value: function failedLogin(res) {
	      if (res.status == 401) {
	        this.loginfailed = true;
	      } else {
	        if (res.data.errors.message[0] == 'Email Unverified') {
	          this.unverified = true;
	        } else {
	          // other kinds of error returned from server
	          for (var error in res.data.errors) {
	            this.loginfailederror += res.data.errors[error] + ' ';
	          }
	        }
	      }
	    }
	  }]);

	  return LoginFormController;
	}();

	var LoginFormComponent = exports.LoginFormComponent = {
	  templateUrl: './views/app/components/login-form/login-form.component.html',
	  controller: LoginFormController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RegisterFormController = function () {
	  RegisterFormController.$inject = ["$auth", "$state", "$scope"];
	  function RegisterFormController($auth, $state, $scope) {
	    'ngInject';

	    _classCallCheck(this, RegisterFormController);

	    this.$auth = $auth;
	    this.$state = $state;
	    this.$scope = $scope;

	    this.password = '';
	    this.password_confirmation = '';
	    this.formSubmitted = false;
	    this.errors = [];
	  }

	  _createClass(RegisterFormController, [{
	    key: '$onInit',
	    value: function $onInit() {
	      this.name = '';
	      this.email = '';
	      this.password = '';
	      this.password_confirmation = '';
	    }
	  }, {
	    key: 'register',
	    value: function register(isValid) {
	      var _this = this;

	      if (isValid) {
	        var user = {
	          name: this.name,
	          email: this.email,
	          password: this.password,
	          password_confirmation: this.password_confirmation
	        };
	        this.$auth.signup(user).then(function () {
	          _this.$state.go('login', { registerSuccess: true });
	        }).catch(this.failedRegistration.bind(this));
	      } else {
	        this.formSubmitted = true;
	      }
	    }
	  }, {
	    key: 'failedRegistration',
	    value: function failedRegistration(response) {
	      if (response.status === 422) {
	        for (var error in response.data.errors) {
	          this.errors[error] = response.data.errors[error][0];
	          this.$scope.userForm[error].$invalid = true;
	        }
	      }
	    }
	  }]);

	  return RegisterFormController;
	}();

	var RegisterFormComponent = exports.RegisterFormComponent = {
	  templateUrl: './views/app/components/register-form/register-form.component.html',
	  controller: RegisterFormController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _routeBodyclass = __webpack_require__(32);

	var _passwordVerify = __webpack_require__(33);

	var _scrollToBottom = __webpack_require__(34);

	angular.module('app.components').directive('routeBodyclass', _routeBodyclass.RouteBodyClassComponent).directive('passwordVerify', _passwordVerify.PasswordVerifyClassComponent).directive('scrollToBottom', _scrollToBottom.ScrollToBottomComponent);

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	routeBodyClass.$inject = ['$rootScope'];
	function routeBodyClass($rootScope) {
	  return {
	    scope: { ngModel: '=ngModel' },
	    link: function routeBodyClassLink(scope, elem) {
	      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        // eslint-disable-line angular/on-watch
	        var fromClassnames = angular.isDefined(fromState.data) && angular.isDefined(fromState.data.bodyClass) ? fromState.data.bodyClass : null;
	        var toClassnames = angular.isDefined(toState.data) && angular.isDefined(toState.data.bodyClass) ? toState.data.bodyClass : null;

	        if (fromClassnames != toClassnames) {
	          if (fromClassnames) {
	            elem.removeClass(fromClassnames);
	          }

	          if (toClassnames) {
	            elem.addClass(toClassnames);
	          }
	        }
	      });
	    },
	    restrict: 'EA'
	  };
	}

	var RouteBodyClassComponent = exports.RouteBodyClassComponent = routeBodyClass;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function passwordVerifyClass() {
	  return {
	    require: 'ngModel',
	    scope: {
	      passwordVerify: '='
	    },
	    link: function link(scope, element, attrs, ctrl) {
	      scope.$watch(function () {
	        var combined;

	        if (scope.passwordVerify || ctrl.$viewValue) {
	          combined = scope.passwordVerify + '_' + ctrl.$viewValue;
	        }

	        return combined;
	      }, function (value) {
	        if (value) {
	          ctrl.$parsers.unshift(function (viewValue) {
	            var origin = scope.passwordVerify;

	            if (origin !== viewValue) {
	              ctrl.$setValidity('passwordVerify', false);
	              return undefined;
	            } else {
	              ctrl.$setValidity('passwordVerify', true);
	              return viewValue;
	            }
	          });
	        }
	      });
	    }
	  };
	}

	var PasswordVerifyClassComponent = exports.PasswordVerifyClassComponent = passwordVerifyClass;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	scrollToBottom.$inject = ['$timeout', '$window'];
	function scrollToBottom($timeout, $window) {
	    return {
	        scope: {
	            scrollToBottom: "="
	        },
	        restrict: 'A',
	        link: function link(scope, element, attr) {
	            scope.$watchCollection('scrollToBottom', function (newVal) {
	                if (newVal) {
	                    $timeout(function () {
	                        element[0].scrollTop = element[0].scrollHeight;
	                    }, 0);
	                }
	            });
	        }
	    };
	}

	var ScrollToBottomComponent = exports.ScrollToBottomComponent = scrollToBottom;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(36);

	var _API = __webpack_require__(37);

	angular.module('app.services').service('ContextService', _context.ContextService).service('API', _API.APIService);

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContextService = exports.ContextService = function () {
	  ContextService.$inject = ["$auth", "$rootScope", "API"];
	  function ContextService($auth, $rootScope, API) {
	    'ngInject';

	    _classCallCheck(this, ContextService);

	    this.$auth = $auth;
	    this.API = API;
	    this.$rootScope = $rootScope;
	  }

	  _createClass(ContextService, [{
	    key: 'getContext',
	    value: function getContext() {
	      var $auth = this.$auth;

	      if ($auth.isAuthenticated()) {
	        var API = this.API;
	        var UserData = API.service('me', API.all('users'));

	        return UserData.one().get();
	      } else {
	        return null;
	      }
	    }
	  }, {
	    key: 'me',
	    value: function me(cb) {
	      this.$rootScope.$watch('me', function (nv) {
	        cb(nv);
	      });
	    }
	  }]);

	  return ContextService;
	}();

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var APIService = exports.APIService = ["Restangular", "$window", function APIService(Restangular, $window) {
	  'ngInject';
	  // content negotiation

	  _classCallCheck(this, APIService);

	  var headers = {
	    'Content-Type': 'application/json',
	    'Accept': 'application/x.laravel.v1+json'
	  };

	  return Restangular.withConfig(function (RestangularConfigurer) {
	    RestangularConfigurer.setBaseUrl('/api/').setDefaultHeaders(headers).setErrorInterceptor(function (response) {
	      if (response.status === 422) {
	        // for (var error in response.data.errors) {
	        // return ToastService.error(response.data.errors[error][0])
	        // }
	      }
	    }).addFullRequestInterceptor(function (element, operation, what, url, headers) {
	      var token = $window.localStorage.satellizer_token;
	      if (token) {
	        headers.Authorization = 'Bearer ' + token;
	      }
	    }).addResponseInterceptor(function (response, operation, what) {
	      if (operation === 'getList') {
	        var newResponse = response.data[what];
	        newResponse.error = response.error;
	        return newResponse;
	      }

	      return response;
	    });
	  });
	}];

/***/ })
/******/ ]);