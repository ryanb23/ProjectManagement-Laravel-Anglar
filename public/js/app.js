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

	__webpack_require__(10);

	__webpack_require__(18);

	__webpack_require__(37);

	__webpack_require__(54);

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
	angular.module('app.components', ['ui.router', 'angular-loading-bar', 'restangular', 'ngStorage', 'satellizer', 'mm.acl', 'oc.lazyLoad', 'ui.utils', 'ui.grid']);

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

	var _lazyload = __webpack_require__(9);

	angular.module('app.config').config(_acl.AclConfig).config(_lazyload.LazyloadConfig).config(_routes.RoutesConfig).config(_loading_bar.LoadingBarConfig).config(_satellizer.SatellizerConfig);

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

	RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider", "$ocLazyLoadProvider"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RoutesConfig = RoutesConfig;
	function RoutesConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
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
	            'sidebar@app': {
	                template: '<nav-sidebar></nav-sidebar>'
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
	    }).state('app.organiztion', {
	        url: '/organiztion',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<organization></organization>'
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
	    }).state('app.projects.create', {
	        url: '/create',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<project-create></project-create>'
	            }
	        }
	    }).state('app.preference', {
	        url: '/preference',
	        data: {
	            auth: true
	        },
	        views: {
	            'main@app': {
	                template: '<preference></preference>'
	            }
	        }
	    }).state('app.users', {
	        url: '/users',
	        data: {
	            auth: true
	        },
	        resolve: {
	            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['dataTables', 'ui-grid'], {
	                    insertBefore: '#lazyload_placeholder'
	                }).then(function () {
	                    console.log(3);
	                });
	            }]
	        },
	        views: {
	            'main@app': {
	                template: '<user-management></user-management>'
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
/***/ (function(module, exports) {

	'use strict';

	LazyloadConfig.$inject = ["$ocLazyLoadProvider"];
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LazyloadConfig = LazyloadConfig;
	function LazyloadConfig($ocLazyLoadProvider) {
	    'ngInject';

	    $ocLazyLoadProvider.config({
	        debug: true,
	        events: true,
	        modules: [{
	            name: 'isotope',
	            files: ['assets/plugins/imagesloaded/imagesloaded.pkgd.min.js', 'assets/plugins/jquery-isotope/isotope.pkgd.min.js']
	        }, {
	            name: 'codropsDialogFx',
	            files: ['assets/plugins/codrops-dialogFx/dialogFx.js', 'assets/plugins/codrops-dialogFx/dialog.css', 'assets/plugins/codrops-dialogFx/dialog-sandra.css']
	        }, {
	            name: 'metrojs',
	            files: ['assets/plugins/jquery-metrojs/MetroJs.min.js', 'assets/plugins/jquery-metrojs/MetroJs.css']
	        }, {
	            name: 'owlCarousel',
	            files: ['assets/plugins/owl-carousel/owl.carousel.min.js', 'assets/plugins/owl-carousel/assets/owl.carousel.css']
	        }, {
	            name: 'noUiSlider',
	            files: ['assets/plugins/jquery-nouislider/jquery.nouislider.min.js', 'assets/plugins/jquery-nouislider/jquery.liblink.js', 'assets/plugins/jquery-nouislider/jquery.nouislider.css']
	        }, {
	            name: 'nvd3',
	            files: ['assets/plugins/nvd3/lib/d3.v3.js', 'assets/plugins/nvd3/nv.d3.min.js', 'assets/plugins/nvd3/src/utils.js', 'assets/plugins/nvd3/src/tooltip.js', 'assets/plugins/nvd3/src/interactiveLayer.js', 'assets/plugins/nvd3/src/models/axis.js', 'assets/plugins/nvd3/src/models/line.js', 'assets/plugins/nvd3/src/models/lineWithFocusChart.js', 'assets/plugins/angular-nvd3/angular-nvd3.js', 'assets/plugins/nvd3/nv.d3.min.css'],
	            serie: true // load in the exact order
	        }, {
	            name: 'rickshaw',
	            files: ['assets/plugins/nvd3/lib/d3.v3.js', 'assets/plugins/rickshaw/rickshaw.min.js', 'assets/plugins/angular-rickshaw/rickshaw.js', 'assets/plugins/rickshaw/rickshaw.min.css'],
	            serie: true
	        }, {
	            name: 'sparkline',
	            files: ['assets/plugins/jquery-sparkline/jquery.sparkline.min.js', 'assets/plugins/angular-sparkline/angular-sparkline.js']
	        }, {
	            name: 'mapplic',
	            files: ['assets/plugins/mapplic/js/hammer.js', 'assets/plugins/mapplic/js/jquery.mousewheel.js', 'assets/plugins/mapplic/js/mapplic.js', 'assets/plugins/mapplic/css/mapplic.css']
	        }, {
	            name: 'skycons',
	            files: ['assets/plugins/skycons/skycons.js']
	        }, {
	            name: 'switchery',
	            files: ['assets/plugins/switchery/js/switchery.min.js', 'assets/plugins/ng-switchery/ng-switchery.js', 'assets/plugins/switchery/css/switchery.min.css']
	        }, {
	            name: 'menuclipper',
	            files: ['assets/plugins/jquery-menuclipper/jquery.menuclipper.css', 'assets/plugins/jquery-menuclipper/jquery.menuclipper.js']
	        }, {
	            name: 'wysihtml5',
	            files: ['assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.min.css', 'assets/plugins/bootstrap3-wysihtml5/bootstrap3-wysihtml5.all.min.js']
	        }, {
	            name: 'stepsForm',
	            files: ['assets/plugins/codrops-stepsform/css/component.css', 'assets/plugins/codrops-stepsform/js/stepsForm.js']
	        }, {
	            name: 'jquery-ui',
	            files: ['assets/plugins/jquery-ui-touch/jquery.ui.touch-punch.min.js']
	        }, {
	            name: 'moment',
	            files: ['assets/plugins/moment/moment.min.js', 'assets/plugins/moment/moment-with-locales.min.js']
	        }, {
	            name: 'moment-locales',
	            files: ['assets/plugins/moment/moment-with-locales.min.js']
	        }, {
	            name: 'hammer',
	            files: ['assets/plugins/hammer.min.js']
	        }, {
	            name: 'sieve',
	            files: ['assets/plugins/jquery.sieve.min.js']
	        }, {
	            name: 'line-icons',
	            files: ['assets/plugins/simple-line-icons/simple-line-icons.css']
	        }, {
	            name: 'ionRangeSlider',
	            files: ['assets/plugins/ion-slider/css/ion.rangeSlider.css', 'assets/plugins/ion-slider/css/ion.rangeSlider.skinFlat.css', 'assets/plugins/ion-slider/js/ion.rangeSlider.min.js']
	        }, {
	            name: 'navTree',
	            files: ['assets/plugins/angular-bootstrap-nav-tree/abn_tree_directive.js', 'assets/plugins/angular-bootstrap-nav-tree/abn_tree.css']
	        }, {
	            name: 'nestable',
	            files: ['assets/plugins/jquery-nestable/jquery.nestable.css', 'assets/plugins/jquery-nestable/jquery.nestable.js', 'assets/plugins/angular-nestable/angular-nestable.js']
	        }, {
	            //https://github.com/angular-ui/ui-select
	            name: 'select',
	            files: ['assets/plugins/bootstrap-select2/select2.css', 'assets/plugins/angular-ui-select/select.min.css', 'assets/plugins/angular-ui-select/pages-select2-old.css', 'assets/plugins/angular-ui-select/select.min.js']
	        }, {
	            name: 'datepicker',
	            files: ['assets/plugins/bootstrap-datepicker/css/datepicker3.css', 'assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js']
	        }, {
	            name: 'daterangepicker',
	            files: ['assets/plugins/moment/moment.min.js', 'assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css', 'assets/plugins/bootstrap-daterangepicker/daterangepicker.js', 'assets/plugins/angular-daterangepicker/angular-daterangepicker.min.js'],
	            serie: true
	        }, {
	            name: 'timepicker',
	            files: ['assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css', 'assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.js']
	        }, {
	            name: 'inputMask',
	            files: ['assets/plugins/jquery-inputmask/jquery.inputmask.min.js']
	        }, {
	            name: 'autonumeric',
	            files: ['assets/plugins/jquery-autonumeric/autoNumeric.js']
	        }, {
	            name: 'summernote',
	            files: ['assets/plugins/summernote/css/summernote.css', 'assets/plugins/summernote/js/summernote.min.js', 'assets/plugins/angular-summernote/angular-summernote.min.js'],
	            serie: true // load in the exact order
	        }, {
	            name: 'tagsInput',
	            files: ['assets/plugins/bootstrap-tag/bootstrap-tagsinput.css', 'assets/plugins/bootstrap-tag/bootstrap-tagsinput.min.js']
	        }, {
	            name: 'dropzone',
	            files: ['assets/plugins/dropzone/css/dropzone.css', 'assets/plugins/dropzone/dropzone.min.js', 'assets/plugins/angular-dropzone/angular-dropzone.js'],
	            serie: true
	        }, {
	            name: 'wizard',
	            files: ['assets/plugins/lodash/lodash.min.js', 'assets/plugins/angular-wizard/angular-wizard.min.css', 'assets/plugins/angular-wizard/angular-wizard.min.js']
	        }, {
	            name: 'dataTables',
	            files: ['assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css', 'assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css', 'assets/plugins/datatables-responsive/css/datatables.responsive.css', 'assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js', 'assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js', 'assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js', 'assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js', 'assets/plugins/datatables-responsive/js/datatables.responsive.js'],
	            serie: true // load in the exact order
	        }, {
	            name: 'google-map',
	            files: ['assets/plugins/angular-google-map-loader/google-map-loader.js', 'assets/plugins/angular-google-map-loader/google-maps.js']
	        }, {
	            name: 'interact',
	            files: ['assets/plugins/interactjs/interact.min.js']
	        }, {
	            name: 'tabcollapse',
	            files: ['assets/plugins/bootstrap-collapse/bootstrap-tabcollapse.js']
	        }, {
	            name: 'ui-grid',
	            files: ['assets/plugins/angular-ui-grid/ui-grid.min.css', 'assets/plugins/angular-ui-grid/ui-grid.min.js']

	        }, {
	            name: 'typehead',
	            files: ['assets/plugins/bootstrap-typehead/typeahead.bundle.min.js', 'assets/plugins/bootstrap-typehead/typeahead.jquery.min.js', 'assets/plugins/bootstrap-typehead/bloodhound.min.js', 'assets/plugins/angular-typehead/angular-typeahead.min.js']
	        }]
	    });
	}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _date_millis = __webpack_require__(11);

	var _capitalize = __webpack_require__(12);

	var _human_readable = __webpack_require__(13);

	var _truncate_characters = __webpack_require__(14);

	var _truncate_words = __webpack_require__(15);

	var _trust_html = __webpack_require__(16);

	var _ucfirst = __webpack_require__(17);

	angular.module('app.filters').filter('datemillis', _date_millis.DateMillisFilter).filter('capitalize', _capitalize.CapitalizeFilter).filter('humanreadable', _human_readable.HumanReadableFilter).filter('truncateCharacters', _truncate_characters.TruncatCharactersFilter).filter('truncateWords', _truncate_words.TruncateWordsFilter).filter('trustHtml', _trust_html.TrustHtmlFilter).filter('ucfirst', _ucfirst.UcFirstFilter);

/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _chat = __webpack_require__(19);

	var _projectCreate = __webpack_require__(20);

	var _projects = __webpack_require__(21);

	var _projectView = __webpack_require__(22);

	var _contacts = __webpack_require__(23);

	var _dashboard = __webpack_require__(24);

	var _navSidebar = __webpack_require__(25);

	var _navHeader = __webpack_require__(26);

	var _loginLoader = __webpack_require__(27);

	var _resetPassword = __webpack_require__(28);

	var _forgotPassword = __webpack_require__(29);

	var _loginForm = __webpack_require__(30);

	var _registerForm = __webpack_require__(31);

	var _quickSearch = __webpack_require__(32);

	var _quickView = __webpack_require__(33);

	var _organization = __webpack_require__(34);

	var _preference = __webpack_require__(35);

	var _userManagement = __webpack_require__(36);

	// import { TablesSimpleComponent } from './app/components/tables-simple/tables-simple.component'
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
	.component('chat', _chat.ChatComponent).component('projectView', _projectView.ProjectViewComponent).component('projectCreate', _projectCreate.ProjectCreateComponent).component('projects', _projects.ProjectsComponent).component('contacts', _contacts.ContactsComponent).component('dashboard', _dashboard.DashboardComponent).component('navSidebar', _navSidebar.NavSidebarComponent).component('navHeader', _navHeader.NavHeaderComponent).component('loginLoader', _loginLoader.LoginLoaderComponent).component('resetPassword', _resetPassword.ResetPasswordComponent).component('forgotPassword', _forgotPassword.ForgotPasswordComponent).component('loginForm', _loginForm.LoginFormComponent).component('registerForm', _registerForm.RegisterFormComponent).component('quickSearch', _quickSearch.QuickSearchComponent).component('quickView', _quickView.QuickViewComponent).component('organization', _organization.OrganizationComponent).component('preference', _preference.PreferenceComponent).component('userManagement', _userManagement.UserManagementComponent);

/***/ }),
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
	    this.$rootscope = $rootScope;
	    ContextService.me(function (data) {
	      navHeader.userData = data;
	    });
	  }

	  _createClass(NavHeaderController, [{
	    key: 'showSearchOverlay',
	    value: function showSearchOverlay() {
	      this.$rootscope.$broadcast('toggleSearchOverlay', {
	        show: true
	      });
	    }
	  }, {
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
	      this.firstname = '';
	      this.lastname = '';
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
	          firstname: this.firstname,
	          lastname: this.lastname,
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
/* 32 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QuickSearchController = function () {
	  QuickSearchController.$inject = ["API", "ContextService"];
	  function QuickSearchController(API, ContextService) {
	    'ngInject';

	    _classCallCheck(this, QuickSearchController);
	  }

	  _createClass(QuickSearchController, [{
	    key: 'liveSearch',
	    value: function liveSearch() {
	      console.log("Live search for: " + $scope.search.query);
	    }
	  }, {
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return QuickSearchController;
	}();

	var QuickSearchComponent = exports.QuickSearchComponent = {
	  templateUrl: './views/app/components/quick-search/quick-search.component.html',
	  controller: QuickSearchController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var QuickViewController = function () {
	  QuickViewController.$inject = ["API", "ContextService"];
	  function QuickViewController(API, ContextService) {
	    'ngInject';

	    _classCallCheck(this, QuickViewController);
	  }

	  _createClass(QuickViewController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return QuickViewController;
	}();

	var QuickViewComponent = exports.QuickViewComponent = {
	  templateUrl: './views/app/components/quick-view/quick-view.component.html',
	  controller: QuickViewController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var OrganizationController = function OrganizationController($scope) {
	  'ngInject';

	  _classCallCheck(this, OrganizationController);

	  $scope.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	  $scope.series = ['Series A', 'Series B'];
	  $scope.data = [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]];

	  $scope.onClick = function () {};

	  $scope.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	  $scope.pieData = [300, 500, 100];
	};
	OrganizationController.$inject = ["$scope"];

	var OrganizationComponent = exports.OrganizationComponent = {
	  templateUrl: './views/app/components/organization/organization.component.html',
	  controller: OrganizationController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PreferenceController = function () {
	  function PreferenceController() {
	    'ngInject';

	    //

	    _classCallCheck(this, PreferenceController);
	  }

	  _createClass(PreferenceController, [{
	    key: '$onInit',
	    value: function $onInit() {}
	  }]);

	  return PreferenceController;
	}();

	var PreferenceComponent = exports.PreferenceComponent = {
	  templateUrl: './views/app/components/preference/preference.component.html',
	  controller: PreferenceController,
	  controllerAs: 'vm',
	  bindings: {}
	};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var UserManagementController = function () {
	    UserManagementController.$inject = ["$scope"];
	    function UserManagementController($scope) {
	        'ngInject';

	        _classCallCheck(this, UserManagementController);

	        this.table = $('#tableWithSearch');
	        this.addTable = $('#addNewAppModal');
	        var that = this;

	        this.options = {
	            "sDom": "<'table-responsive't><'row'<p i>>",

	            "destroy": true,
	            "scrollCollapse": true,
	            "oLanguage": {
	                "sLengthMenu": "_MENU_ ",
	                "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
	            },
	            "iDisplayLength": 5
	        };
	        this.filter = function (event) {
	            that.table.dataTable().fnFilter($(event.currentTarget).val());
	        };
	        this.showModal = function () {
	            that.addTable.modal('show');
	        };
	        this.addNewUser = function () {
	            alert();
	            that.addTable.modal('hide');
	        };
	        this.hideModal = function () {
	            that.addTable.modal('hide');
	        };
	    }

	    _createClass(UserManagementController, [{
	        key: '$onInit',
	        value: function $onInit() {}
	    }]);

	    return UserManagementController;
	}();

	var UserManagementComponent = exports.UserManagementComponent = {
	    templateUrl: './views/app/components/user-management/user-management.component.html',
	    controller: UserManagementController,
	    controllerAs: 'vm',
	    bindings: {}
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _routeBodyclass = __webpack_require__(38);

	var _passwordVerify = __webpack_require__(39);

	var _scrollToBottom = __webpack_require__(40);

	var _csSelect = __webpack_require__(41);

	var _pgDropdown = __webpack_require__(42);

	var _pgFormGroup = __webpack_require__(43);

	var _pgHorizontalMenu = __webpack_require__(44);

	var _pgNavigate = __webpack_require__(45);

	var _pgNotificationCenter = __webpack_require__(46);

	var _pgPortlet = __webpack_require__(47);

	var _pgQuickview = __webpack_require__(48);

	var _pgSearch = __webpack_require__(49);

	var _pgSidebar = __webpack_require__(50);

	var _pgTabDropdownfx = __webpack_require__(51);

	var _pgTab = __webpack_require__(52);

	var _skycons = __webpack_require__(53);

	angular.module('app.components').directive('routeBodyclass', _routeBodyclass.RouteBodyClassComponent).directive('passwordVerify', _passwordVerify.PasswordVerifyClassComponent).directive('scrollToBottom', _scrollToBottom.ScrollToBottomComponent).directive('csSelect', _csSelect.CsSelect).directive('pgDropdown', _pgDropdown.PgDropdown).directive('pgFormGroup', _pgFormGroup.PgFormGroup).directive('pgHorizontalMenu', _pgHorizontalMenu.PgHorizontalMenu).directive('pgHorizontalMenu', _pgHorizontalMenu.PgHorizontalMenuToggle).directive('pgNavigate', _pgNavigate.PgNavigate).directive('pgNotificationCenter', _pgNotificationCenter.PgNotificationCenter).directive('pgPortlet', _pgPortlet.PgPortlet).directive('pgQuickview', _pgQuickview.PgQuickview).directive('pgSearch', _pgSearch.PgSearch).directive('pgSidebar', _pgSidebar.PgSidebar).directive('pgTabDropdownfx', _pgTabDropdownfx.PgTabDropdownfx).directive('pgTab', _pgTab.PgTab).directive('skycons', _skycons.Skycons).directive('includeReplace', function () {
	    return {
	        require: 'ngInclude',
	        restrict: 'A',
	        link: function link(scope, el) {
	            el.replaceWith(el.children());
	        }
	    };
	});

/***/ }),
/* 38 */
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
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: csSelect
	 * AngularJS directive for SelectFx jQuery plugin
	 * https://github.com/codrops/SelectInspiration
	 * ============================================================ */

	csSelect.$inject = ['$compile'];
	function csSelect($compile) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            if (!window.SelectFx) return;

	            var newElement = angular.element('<div class="cs-wrapper"></div>');
	            element.wrap($compile(newElement)(scope));
	            new SelectFx(element[0]);
	        }
	    };
	}

	var CsSelect = exports.CsSelect = csSelect;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgDropdown
	 * Prepare Bootstrap dropdowns to match Pages theme
	 * ============================================================ */

	function pgDropdown() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {

	            var btn = angular.element(element).find('.dropdown-menu').siblings('.dropdown-toggle');
	            var offset = 0;

	            var padding = btn.actual('innerWidth') - btn.actual('width');
	            var menuWidth = angular.element(element).find('.dropdown-menu').actual('outerWidth');

	            if (btn.actual('outerWidth') < menuWidth) {
	                btn.width(menuWidth - offset);
	                angular.element(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
	            } else {
	                angular.element(element).find('.dropdown-menu').width(btn.actual('outerWidth'));
	            }
	        }
	    };
	}

	var PgDropdown = exports.PgDropdown = pgDropdown;

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgFormGroup
	 * Apply Pages default form effects
	 * ============================================================ */

	function pgFormGroup() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            $(element).on('click', function () {
	                $(this).find(':input').focus();
	            });

	            $('body').on('focus', '.form-group.form-group-default :input', function () {
	                $('.form-group.form-group-default').removeClass('focused');
	                $(this).parents('.form-group').addClass('focused');
	            });

	            $('body').on('blur', '.form-group.form-group-default :input', function () {
	                $(this).parents('.form-group').removeClass('focused');
	                if ($(this).val()) {
	                    $(this).closest('.form-group').find('label').addClass('fade');
	                } else {
	                    $(this).closest('.form-group').find('label').removeClass('fade');
	                }
	            });

	            $(element).find('.checkbox, .radio').hover(function () {
	                $(this).parents('.form-group').addClass('focused');
	            }, function () {
	                $(this).parents('.form-group').removeClass('focused');
	            });
	        }
	    };
	}

	var PgFormGroup = exports.PgFormGroup = pgFormGroup;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgHorizontalMenu
	 * AngularJS directive for Pages Horizontal Menu
	 * ============================================================ */

	pgHorizontalMenu.$inject = ['$parse'];
	function pgHorizontalMenu($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {

	            $(document).on('click', '.horizontal-menu .bar-inner > ul > li', function () {
	                $(this).toggleClass('open').siblings().removeClass('open');
	            });

	            $('.content').on('click', function () {
	                $('.horizontal-menu .bar-inner > ul > li').removeClass('open');
	            });
	        }
	    };
	}

	var PgHorizontalMenu = exports.PgHorizontalMenu = pgHorizontalMenu;

	pgHorizontalMenuToggle.$inject = ['$parse'];
	function pgHorizontalMenuToggle($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {

	            $(element).click(function (e) {
	                e.preventDefault();
	                $('body').toggleClass('menu-opened');
	            });
	        }
	    };
	}

	var PgHorizontalMenuToggle = exports.PgHorizontalMenuToggle = pgHorizontalMenuToggle;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgNavigate
	 * Pre-made view ports to be used for HTML5 mobile hybrid apps
	 * ============================================================ */

	function pgNavigate() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {

	            $(element).click(function () {
	                var el = $(this).attr('data-view-port');
	                if ($(this).attr('data-toggle-view') != null) {
	                    $(el).children().last().children('.view').hide();
	                    $($(this).attr('data-toggle-view')).show();
	                }
	                $(el).toggleClass($(this).attr('data-view-animation'));
	                return false;
	            });
	        }
	    };
	};

	var PgNavigate = exports.PgNavigate = pgNavigate;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgNotificationCenter
	 * Shows a list of notifications in a dropdown in header
	 * ============================================================ */

	function pgNotificationCenter() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            $(element).on('click', function (event) {
	                event.stopPropagation();
	            });
	            $(element).find('.toggle-more-details').on('click', function (event) {
	                var p = $(this).closest('.heading');
	                p.closest('.heading').children('.more-details').stop().slideToggle('fast', function () {
	                    p.toggleClass('open');
	                });
	            });
	        }
	    };
	}

	var PgNotificationCenter = exports.PgNotificationCenter = pgNotificationCenter;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgPortlet
	 * AngularJS directive for Pages Portlets jQuery plugin
	 * ============================================================ */

	pgPortlet.$inject = ['$parse'];
	function pgPortlet($parse) {
	    return {
	        restrict: 'A',
	        scope: true,
	        link: function link(scope, element, attrs) {

	            var onRefresh = $parse(attrs.onRefresh);

	            var options = {};

	            if (attrs.progress) options.progress = attrs.progress;
	            if (attrs.overlayOpacity) options.overlayOpacity = attrs.overlayOpacity;
	            if (attrs.overlayColor) options.overlayColor = attrs.overlayColor;
	            if (attrs.progressColor) options.progressColor = attrs.progressColor;
	            if (attrs.onRefresh) options.onRefresh = function () {
	                onRefresh(scope);
	            };

	            element.portlet(options);
	        }
	    };
	}

	var PgPortlet = exports.PgPortlet = pgPortlet;

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgQuickview
	 * AngularJS directive for Pages Overlay Search jQuery plugin
	 * ============================================================ */

	pgQuickview.$inject = ['$parse'];
	function pgQuickview($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            var $quickview = $(element);
	            $quickview.quickview($quickview.data());
	        }
	    };
	}

	var PgQuickview = exports.PgQuickview = pgQuickview;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgSearch
	 * AngularJS directive for Pages Overlay Search jQuery plugin
	 * ============================================================ */

	pgSearch.$inject = ['$parse'];
	function pgSearch($parse) {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            angular.element(element).search();

	            scope.$on('toggleSearchOverlay', function (scopeDetails, status) {
	                if (status.show) {
	                    angular.element(element).data('pg.search').toggleOverlay('show');
	                } else {
	                    angular.element(element).data('pg.search').toggleOverlay('hide');
	                }
	            });
	        }
	    };
	}

	var PgSearch = exports.PgSearch = pgSearch;

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgSidebar
	 * AngularJS directive for Pages Sidebar jQuery plugin
	 * ============================================================ */

	function pgSidebar() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            var $sidebar = $(element);
	            $sidebar.sidebar($sidebar.data());

	            // Bind events
	            // Toggle sub menus
	            $('body').on('click', '.sidebar-menu a', function (e) {

	                if ($(this).parent().children('.sub-menu') === false) {
	                    return;
	                }
	                var el = $(this);
	                var parent = $(this).parent().parent();
	                var li = $(this).parent();
	                var sub = $(this).parent().children('.sub-menu');

	                if (li.hasClass("active open")) {
	                    el.children('.arrow').removeClass("active open");
	                    sub.slideUp(200, function () {
	                        li.removeClass("active open");
	                    });
	                } else {
	                    parent.children('li.open').children('.sub-menu').slideUp(200);
	                    parent.children('li.open').children('a').children('.arrow').removeClass('active open');
	                    parent.children('li.open').removeClass("open active");
	                    el.children('.arrow').addClass("active open");
	                    sub.slideDown(200, function () {
	                        li.addClass("active open");
	                    });
	                }
	            });
	        }
	    };
	}
	var PgSidebar = exports.PgSidebar = pgSidebar;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgTabDropdownfx
	 * Responsive Tabs with dropdown effect
	 * effect for tab transitions.
	 * ============================================================ */

	function pgTabDropdownfx() {
	    return {
	        link: function link(scope, element, attrs) {

	            var drop = $(element);
	            drop.addClass("hidden-sm hidden-xs");
	            var content = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">';
	            for (var i = 1; i <= drop.children("li").length; i++) {
	                var li = drop.children("li:nth-child(" + i + ")");
	                var selected = "";
	                if (li.hasClass("active")) {
	                    selected = "selected";
	                }
	                content += '<option value="' + li.children('a').attr('href') + '" ' + selected + '>';
	                content += li.children('a').text();
	                content += '</option>';
	            }
	            content += '</select>';
	            drop.after(content);
	            var select = drop.next()[0];
	            $(select).on('change', function (e) {
	                var optionSelected = $("option:selected", this);
	                var valueSelected = this.value;
	                drop.find('a[href="' + valueSelected + '"]').tab('show');
	            });
	            $(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width p-t-10 visible-xs visible-sm"></div>');
	            new SelectFx(select);
	        }
	    };
	}

	var PgTabDropdownfx = exports.PgTabDropdownfx = pgTabDropdownfx;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: pgTab
	 * Makes Bootstrap Tabs compatible with AngularJS and add sliding
	 * effect for tab transitions.
	 * ============================================================ */

	pgTab.$inject = ['$parse'];
	function pgTab($parse) {
	    return {
	        link: function link(scope, element, attrs) {
	            var slide = attrs.slide;
	            var onShown = $parse(attrs.onShown);
	            // Sliding effect for tabs
	            $(element).on('show.bs.tab', function (e) {
	                e = $(e.target).parent().find('a[data-toggle=tab]');

	                var hrefCurrent = e.attr('href');

	                if ($(hrefCurrent).is('.slide-left, .slide-right')) {
	                    $(hrefCurrent).addClass('sliding');

	                    setTimeout(function () {
	                        $(hrefCurrent).removeClass('sliding');
	                    }, 100);
	                }
	            });

	            $(element).on('shown.bs.tab', {
	                onShown: onShown
	            }, function (e) {
	                if (e.data.onShown) {
	                    e.data.onShown(scope);
	                }
	            });

	            $(element).click(function (e) {
	                e.preventDefault();
	                $(element).tab('show');
	            });
	        }
	    };
	}

	var PgTab = exports.PgTab = pgTab;

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/* ============================================================
	 * Directive: skycons
	 * AngularJS directive for skycons plugin
	 * http://darkskyapp.github.io/skycons/
	 * ============================================================ */

	function skycons() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            var skycons = new Skycons();
	            skycons.add($(element).get(0), attrs.class);
	            skycons.play();
	        }
	    };
	}

	var Skycons = exports.Skycons = skycons;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _context = __webpack_require__(55);

	var _API = __webpack_require__(56);

	angular.module('app.services').service('ContextService', _context.ContextService).service('API', _API.APIService);

/***/ }),
/* 55 */
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
/* 56 */
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