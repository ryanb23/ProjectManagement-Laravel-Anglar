export function RoutesConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    'ngInject'

    var getView = (viewName) => {
        return `./views/app/pages/${viewName}/${viewName}.page.html`
    }

    var getLayout = (layout) => {
        return `./views/app/pages/layout/${layout}.page.html`
    }

    $urlRouterProvider.otherwise('/')
    $stateProvider
        .state('app', {
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
        })
        .state('app.landing', {
            url: '/',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    templateUrl: getView('landing')
                }
            }
        })
        .state('app.user',{
            abstract: true,
            url: '/user',
            data: {
                auth: true
            },
        })
        .state('app.user.profile',{
            url: '/profile',
            views: {
                'main@app': {
                    template: '<user-profile></user-profile>'
                }
            }
        })
        .state('app.user.other-profile',{
            url: '/:userId/profile',
            views: {
                'main@app': {
                    template: '<user-profile-other></user-profile-other>'
                }
            },
            params: {
                userId: null
            }
        })
        .state('app.user.profile-edit',{
            url: '/profile-edit',
            views: {
                'main@app': {
                    template: '<user-profile-edit></user-profile-edit>'
                }
            }
        })
        .state('app.user.password',{
            url: '/password',
            views: {
                'main@app': {
                    template: '<user-password-edit></user-password-edit>'
                }
            }
        })
        .state('app.organiztion', {
            url: '/organiztion',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<organization></organization>'
                }
            }
        })
        .state('app.projects', {
            url: '/projects',
            data: {
                auth: true
            },
            views: {
                'main@app': {
                    template: '<projects></projects>'
                }
            },
            params: {
                status: null
            }
        })
        .state('app.projects.create', {
            url: '/create',
            data: {
                auth: true
            },
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                            'select',
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                              angular.module('app.components', ['ui.select']);
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<project-create></project-create>'
                }
            }
        })
        .state('app.projects.edit', {
            url: '/:projectId/edit',
            data: {
                auth: true
            },
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                            'select',
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                              angular.module('app.components', ['ui.select']);
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<project-edit></project-edit>'
                }
            },
            params: {
                projectId: null
            }
        })
        .state('app.projects.view', {
            url: '/:projectId',
            data: {
                auth: true
            },
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                                'switchery'
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<project-view></project-view>'
                }
            },
            params: {
                projectId: null
            }
        })
        .state('app.preference', {
            url: '/preference',
            data: {
                auth: true
            },
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                                'switchery'
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<preference></preference>'
                }
            }
        })
        .state('app.admin', {
            abstract: true,
            url:'/admin',
            views: {

            },
            data: {
                auth: true
            },
            roles: ['admin.super','admin.admin']
        })
        .state('app.admin.users', {
            url: '/users',
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                              'switchery'
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<user-management></user-management>'
                }
            }
        })
        .state('app.admin.departments', {
            url: '/departments',
            resolve: {
                  deps: ['$ocLazyLoad', function($ocLazyLoad) {
                      return $ocLazyLoad.load([
                              'switchery'
                          ], {
                              insertBefore: '#lazyload_placeholder'
                          })
                          .then(function() {
                          });
                  }]
            },
            views: {
                'main@app': {
                    template: '<department-management></department-management>'
                }
            }
        })
        .state('app.admin.reward_management', {
            url: '/rewards',
            views: {
                'main@app': {
                    template: '<reward-management></reward-management>'
                }
            }
        })
        .state('app.admin.label_management', {
            url: '/labels',
            views: {
                'main@app': {
                    template: '<label-management></label-management>'
                }
            }
        })
        .state('app.admin.jobtitle_management', {
            url: '/jobtitle',
            views: {
                'main@app': {
                    template: '<jobtitle-management></jobtitle-management>'
                }
            }
        })
        .state('app.help', {
            url: '/help',
            data: {
                auth: true
            },
            resolve: {

            },
            views: {
                'main@app': {
                    template: '<help-page></help-page>'
                }
            }
        })
        .state('login', {
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
        })
        .state('loginloader', {
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
        })
        .state('register', {
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
        })
        .state('userverification', {
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
        })
        .state('forgot_password', {
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
        })
        .state('reset_password', {
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
        })
        .state('app.logout', {
            url: '/logout',
            views: {
                'main@app': {
                    controller: function($rootScope, $scope, $auth, $state, AclService) {
                        $auth.logout().then(function() {
                            delete $rootScope.me
                            AclService.flushRoles()
                            AclService.setAbilities({})
                            $state.go('login')
                        })
                    }
                }
            }
        })
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
